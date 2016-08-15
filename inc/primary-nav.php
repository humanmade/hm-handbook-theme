<?php

namespace HM_Handbook;

function render_nav_list( $parent_id = 0 ) {

	$pages = get_pages([
		'sort_column' => 'menu_order, title',
		'parent'      => $parent_id,
		'post_status' => is_user_logged_in() ? [ 'private', 'publish' ] : 'publish',
	]) ;

	if ( empty( $pages ) ) {
		return;
	}

	$classes = [];

	if ( 0 === $parent_id ) {
		$classes[] = 'NavAccordion';
	}

	printf(
		'<ul class="%s">',
		esc_attr( implode( ' ', array_map( 'sanitize_html_class', $classes ) ) )
	);

	array_walk( $pages, __NAMESPACE__ . '\\render_nav_item' );

	echo '</ul>';

}

function render_nav_item( $page ) {

	$classes = ['NavAccordion_Item'];

	if ( 'private' === get_post_status( $page->ID ) ) {
		$classes[] = 'Nav_Item-Private';
	}

	printf(
		'<li class="%s"><a href="%s" class="NavAccordion_Anchor">%s</a>',
		esc_attr( implode( ' ', array_map( 'sanitize_html_class', $classes ) ) ),
		esc_url( get_permalink( $page->ID ) ),
		esc_html( $page->post_title )
	);

	render_nav_list( $page->ID );

	echo '</li>';
}
