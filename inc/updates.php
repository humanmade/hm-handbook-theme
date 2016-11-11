<?php

namespace HM_Handbook;

function latest_pages() {
	$latest = get_posts([
		'post_type' => 'page'
	]);
	$output = '<ol class="updates--list">';
	foreach ( $latest as $post ) {
		$output .= '<li class="updates--list-item">';
		$output .= '<a class="updates--link" href="' . get_permalink( $post->ID ) . '">' . $post->post_title . '</a>';
		$output .= '<span class="updates--link-meta">Posted in ' . get_the_title( $post->post_parent ) . ' on ' . date_i18n( get_option( 'date_format' ), strtotime( $post->post_date ) ) . '</span>';
		$output .= '</li>';
	}
	$output .= '</ol>';
	echo $output;
}
