<?php

namespace HM_Handbook;

function get_latest( $latest = 'posts' ) {

	$args = [ 'post_type' => 'page' ];

	if ( 'edits' === $latest ) {
		$args = array_merge( $args, [ 'orderby' => 'modified' ] );
	}

	$posts = get_posts( $args );

	$output = '<ol class="updates--list">';
	foreach ( $posts as $post ) {
		$output .= '<li class="updates--list-item">';
		$output .= '<a class="updates--link" href="' . get_permalink( $post->ID ) . '">' . $post->post_title . '</a>';
		$output .= '<span class="updates--link-meta">';

		if ( 'posts' === $latest ) {
			$output .= 'Posted in ' . get_the_title( $post->post_parent ) . ' on ' . date_i18n( get_option( 'date_format' ), strtotime( $post->post_date ) );
		} else if ( 'edits' === $latest ) {
			$output .= 'Last updated on ' . date_i18n( get_option( 'date_format' ), strtotime( $post->post_modified ) );
		}

		$output .= '</span>';
		$output .= '</li>';
	}
	$output .= '</ol>';

	echo $output;
}
