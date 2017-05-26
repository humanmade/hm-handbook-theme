<?php

namespace HM_Handbook\Search;

use \WP_REST_Server;
use \WP_REST_Request;
use \WP_Query;

add_action( 'wp_enqueue_scripts', function() {

	wp_localize_script( 'hm-handbook', 'HMHandbookSearchBarSettings', [
		'api_endpoint' => rest_url( 'hm-handbook/v1/search' ),
		'api_nonce'    => wp_create_nonce( 'wp_rest' ),
		'strings' => [
			'label'       => __( 'Search', 'hm-handbook' ),
			'button'      => __( 'Submit', 'hm-handbook' ),
			'placeholder' => __( 'Search the site…', 'hm-handbook' ),
			'noResults'   => __( 'No results found', 'hm-handbook' ),
		],
	] );

}, 20 );

add_action( 'rest_api_init', function() {

	register_rest_route( 'hm-handbook/v1', '/search', [
		'callback'     => __NAMESPACE__ . '\\search_request_callback',
		'methods'      => WP_REST_Server::READABLE,
		'args' => [
			'query' => [
				'sanitize_callback' => 'sanitize_text_field',
			],
		],
	] );

} );

class Result {
	public $title;
	public $excerpt;
	public $site;
	public $author;
	public $date;
	public $url;
	public $type;
}

function search_request_callback( WP_Rest_Request $request ) {

	$query = $request->get_param( 'query' );
	$data  = fallback_search_request( $query );

	return rest_ensure_response( $data );

}

/**
 * Do the elastic search request.
 *
 * @param string $query Query string.
 *
 * @return array Array of HM_Handbook\Search\Result objects.
 */
function elastic_search_request( $query ) {

	$args = [
		'sites' => [ get_current_blog_id() ],
	];

	$items = hmn_hmes_search_items( trim( $query ), $args );

	$data = [
		'query'   => $query,
		'results' => [],
	];

	foreach ( $items as $item ) {
		switch ( $item['_type'] ) {
			case 'post':
				$data['results'][] = normalize_post( $item );
				break;

			case 'comment' :
				$data['results'][] = normalize_comment( $item );
				break;
		}
	}

	return $data;
}


/**
 * Fallback to standard WP search if no elastic search is found.
 *
 * Note only returns top 50 results. No pagination is supported.
 *
 * @param string $query Query string.
 *
 * @return array Array of HM_Handbook\Search\Result objects.
 */
function fallback_search_request( $query ) {

	$search_query_args = [
		's'              => $query,
		'post_type'      => get_post_types( [ 'public' => true ] ),
		'posts_per_page' => 50,
		'post_status'    => [ 'publish' ],
		'perm'           => 'readable',
	];

	if ( is_user_logged_in() ) {
		$search_query_argsp['post_status'][] = 'private';
	}

	$search_query = new WP_Query( $search_query_args );
	$results      = [];

	while ( $search_query->have_posts() ) {

		$search_query->the_post();

		$date_format = sprintf( '%s @ %s', get_option( 'date_format' ), get_option( 'time_format' ) );

		$result          = new Result;
		$result->title   = strip_tags( html_entity_decode( get_the_title() ) );
		$result->excerpt = strip_tags( html_entity_decode( get_the_excerpt() ) );
		$result->author  = get_the_author();
		$result->date    = get_the_date( $date_format );
		$result->url     = get_permalink();

		if ( empty( $result->title ) && empty( $result->excerpt ) ) {
			continue;
		}

		array_push( $results, $result );

	}

	return [
		'query'   => $query,
		'results' => $results,
	];

}

function normalize_post( $item ) {
	$data = new Result();

	// Grab the site from the index name
	$data->site = normalize_site( str_replace( 'hmes_', '', $item['_index'] ) );

	$post = $item['_source'];

	$data->title   = $post['post_title'];
	$data->url     = $post['guid'];
	$data->excerpt = wp_trim_words( $post['post_content'], 80, ' ' . "[\xe2\x80\xa6]" );
	$data->date    = $post['post_modified'];
	$data->type    = isset( $post['post_type'] ) ? $post['post_type'] : 'post';

	// Author, as per P2's functions
	$author = get_user_by( 'id', $post['post_author'] );

	$cb = function ($caps) {
		$caps['list_users'] = true;
		return $caps;
	};

	add_filter( 'user_has_cap', $cb );
	$data->author = [
		'name'   => $author->display_name,
		'ID'     => $author->ID,
		'avatar' => get_avatar( $author->ID, '48', '', '', [ 'class' => 'search-result-avatar' ] )
	];
	remove_filter( 'user_has_cap', $cb );

	$data->raw = $post;

	return $data;
}

function normalize_comment( $item ) {
	$data = new Result();

	// Grab the site from the index name
	$data->site = normalize_site( str_replace( 'hmes_', '', $item['_index'] ) );

	$post = $item['_source'];

	switch_to_blog( $data->site['id'] );

	$parent = (array) get_post( $post['comment_post_ID'] );

	restore_current_blog();

	$data->title   = 'Response to: ' . $parent['post_title'];
	$data->url     = trailingslashit( $parent['guid'] ) . '#comment-' . $post['comment_ID'] ;
	$data->excerpt = wp_trim_words( $post['comment_content'], 80, ' ' . "[\xe2\x80\xa6]" );
	$data->date    = $post['comment_date'];
	$data->type    = 'comment';

	// Author, as per P2's functions
	$author = get_user_by( 'id', $post['user_id'] );

	$cb = function ($caps) {
		$caps['list_users'] = true;
		return $caps;
	};

	add_filter( 'user_has_cap', $cb );
	$data->author = [
		'name'   => $author->display_name,
		'ID'     => $author->ID,
		'avatar' => get_avatar( $author->ID, '48', '', '', [ 'class' => 'search-result-avatar' ] )
	];
	remove_filter( 'user_has_cap', $cb );

	$data->raw = $post;

	return $data;
}

function normalize_site( $site ) {
	$site = get_blog_details( $site );

	$data = [
		'id'     => $site->blog_id,
		'name'   => $site->blogname,
		'domain' => $site->domain,
		'url'    => $site->siteurl,
	];
	return $data;
}
