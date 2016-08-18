<?php

namespace HM_Handbook\PageHistory;

use \DateTime;
use \WP_Query;
use \WP_REST_Request;
use \WP_Error;

add_action( 'init', __NAMESPACE__ . '\\init' );

function init() {

	if( ! current_theme_supports( 'hm-page-history' ) ) {
		return;
	}

	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\localize_script', 20 );
	add_action( 'rest_api_init', __NAMESPACE__ . '\\setup_api', 20 );

	foreach ( [ 'post', 'page' ] as $post_type ) {
		add_post_type_support( $post_type, 'hm-handbook-page-history' );
	};
}

/**
 * Get supported post types.
 *
 * @return array Post type names.
 */
function get_supported_post_types() {
	return array_filter( get_post_types(), function( $post_type ) {
		return post_type_supports( $post_type, 'hm-handbook-page-history' );
	} );
}

/**
 * Pass plugin settings to hm-handbook script.
 *
 * Note must be called AFTER hm-handbook script is registered.
 *
 * @return null
 */
function localize_script() {

	if ( ! is_singular( get_supported_post_types() ) ) {
		return;
	}

	wp_localize_script( 'hm-handbook', 'HMHandbookPageHistory', [
		'strings' => [
			'listTitle' => __( 'Page History', 'hm-handbook' ),
			'loadMore'  => __( 'Load more revisions', 'hm-handbook' ),
		],
		'post_id'   => get_the_ID(),
		'api_base'  => rest_url( 'hm-handbook/v1/' ),
		'api_nonce' => wp_create_nonce( 'wp_rest' ),
	] );

}

/**
 * Setup API. Register rest routes.
 *
 * @return null
 */
function setup_api() {
	register_rest_route(
		'hm-handbook/v1',
		'/revisions/(?P<id>\d+)',
		[
			'methods' => 'GET',
			'callback' => __NAMESPACE__ . '\\get_revisions_response',
			'permission_callback' => __NAMESPACE__ . '\\revisions_request_permissions_callback',
			'args' => [
				'id' => [
					'sanitize_callback' => 'absint',
					'validate_callback' => function( $param, $request, $key ) {
						return is_numeric( $param );
					}
				],
				'paged' => [
					'sanitize_callback' => 'absint',
					'validate_callback' => function( $param, $request, $key ) {
						return is_numeric( $param );
					}
				],
			],
		]
	);

}

/**
 * Get post revisions API request response.
 *
 * @param  \WP_REST_Request $request Request
 *
 * @return \WP_REST_Response Response
 */
function get_revisions_response( WP_REST_Request $request ) {

	$revisions = [];

	$query = new WP_Query( [
		'post_parent'    => $request->get_param( 'id' ),
		'post_type'      => 'revision',
		'post_status'    => 'inherit',
		'posts_per_page' => 5,
		'paged'          => $request->get_param( 'paged' ),
	] );

	foreach ( $query->posts as $revision ) {

		$date   = new DateTime( $revision->post_modified_gmt );
		$author = get_userdata( $revision->post_author );

		$revisions[] = [
			'id'      => $revision->ID,
			'content' => $revision->post_content,
			'date'    => $date->format( 'j M y @ H:i' ),
			'author'  => get_the_author_meta( 'display_name', $revision->post_author ),
		];

	};

	return rest_ensure_response( array(
		'revisions' => $revisions,
		'hasMore'   => $request->get_param( 'paged' ) < $query->max_num_pages,
	) );

}

/**
 * Request permissions callback.
 *
 * Revisions of published posts are public. Otherwise they fall back to the edit_post cap.
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return WP_Error|boolean
 */
function revisions_request_permissions_callback( $request ) {

	$post_id = $request->get_param( 'id' );

	if ( 'publish' === get_post_status( $post_id ) ) {
		return true;
	}

	$parent = apply_filters( 'rest_the_post', get_post( $post_id ), $post_id );

	if ( ! $parent ) {
		return true;
	}

	$parent_post_type_obj = get_post_type_object( $parent->post_type );

	if ( ! current_user_can( $parent_post_type_obj->cap->edit_post, $parent->ID ) ) {
		return new WP_Error( 'rest_cannot_read', __( 'Sorry, you cannot view revisions of this post.' ), array( 'status' => rest_authorization_required_code() ) );
	}

	return true;

}
