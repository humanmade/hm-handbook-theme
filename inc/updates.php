<?php

namespace HM_Handbook;

/**
 * Display a list of latest updates
 *
 * @param string $latest What to show, posts or edits
 */
function display_latest( $latest = 'posts' ) {

	$args = [ 'post_type' => 'page' ];

	if ( 'edits' === $latest ) {
		$args = array_merge( $args, [ 'orderby' => 'modified', 'suppress_filters' => false ] );

		add_filter( 'posts_where', __NAMESPACE__ . '\get_edited_pages_only' );
	}

	$posts = get_posts( $args );

	remove_filter( 'posts_where', __NAMESPACE__ . '\get_edited_pages_only' );

	$output = '<ol class="updates--list">';
	foreach ( $posts as $post ) {
		$output .= '<li class="updates--list-item">';
		$output .= '<a class="updates--link" href="' . get_permalink( $post->ID ) . '">' . $post->post_title . '</a>';
		$output .= '<span class="updates--link-meta">';

		if ( 'posts' === $latest ) {
			$output .= sprintf(
				esc_html__( 'Posted in %1$s on %2$s', 'hm-handbook' ),
				get_the_title( $post->post_parent ),
				date_i18n( get_option( 'date_format' ), strtotime( $post->post_date ) )
			);
		} else if ( 'edits' === $latest ) {
			$output .= sprintf(
				esc_html__( 'Last updated on %s', 'hm-handbook' ),
				date_i18n( get_option( 'date_format' ), strtotime( $post->post_modified ) )
			);
		}

		$output .= '</span>';
		$output .= '</li>';
	}
	$output .= '</ol>';

	echo $output;
}

/**
 * Modify SQL query to only return edited pages
 *
 * @param string $where Existing SQL query string
 * @return string $where New SQL query string
 */
function get_edited_pages_only( $where = '' ) {
	global $wpdb;

	$where .= " AND $wpdb->posts.post_date != $wpdb->posts.post_modified";

	return $where;
}
