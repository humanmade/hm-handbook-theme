<?php

namespace HM_Handbook;

add_filter( 'nav_menu_css_class',       __NAMESPACE__ . '\\nav_accordion_item_class' , 10 , 3 );
add_filter( 'nav_menu_link_attributes', __NAMESPACE__ . '\\nav_accordion_link_attributes' , 10 , 3 );
add_filter( 'nav_menu_css_class',       __NAMESPACE__ . '\\nav_private_item_class' , 10 , 3 );
add_filter( 'wp_get_nav_menu_items',    __NAMESPACE__ . '\\nav_private_link_remove' , 10 , 3 );

/**
 * Output page tree navigation list.
 *
 * @param  integer $parent_id Parent. Default is 0 (all pages).
 * @return null
 */
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

/**
 * Output a single page tree navigation list item.
 *
 * @param  WP_Post $page
 * @return null
 */
function render_nav_item( \WP_Post $page ) {

	$classes = ['nav-accordion__item'];

	if ( 'private' === get_post_status( $page->ID ) ) {
		$classes[] = 'nav-accordion__item--private';
	}

	if ( is_nav_item_current( $page ) ) {
		$classes[] = 'nav-accordion__item--active';
	}

	printf(
		'<li class="%s"><a href="%s" class="nav-accordion__anchor">%s</a>',
		esc_attr( implode( ' ', array_map( 'sanitize_html_class', $classes ) ) ),
		esc_url( get_permalink( $page->ID ) ),
		esc_html( $page->post_title )
	);

	render_nav_list( $page->ID );

	echo '</li>';
}

function is_nav_item_current( \WP_Post $page ) {

	$page_url = get_permalink( $page->ID );

	if ( parse_url( $page_url, PHP_URL_HOST ) !== $_SERVER['HTTP_HOST'] ) {
		return false;
	}

	if ( parse_url( $page_url, PHP_URL_PATH ) !== $_SERVER['REQUEST_URI'] ) {
		return false;
	}

	return true;

}

/**
 * Add nav accordion menu item class
 *
 * Filters nav_menu_css_class for nav-primary
 *
 * @param  array $classes  Menu item classes
 * @param  WP_Post  $item  Menu item object
 * @param  stdClass $args  Nav menu args
 *
 * @return array Menu item classes
 */
function nav_accordion_item_class( $classes, $item, $args ) {
	if ( 'nav-primary' === $args->theme_location ) {
		$classes[] = 'nav-accordion__item';
		if ( array_intersect( $classes, [ 'current-menu-item' ] ) ) {
			$classes[] = 'nav-accordion__item--active';
		}
	}
	return $classes;
}

/**
 * Add nav accordion menu item class
 *
 * Filters nav_menu_link_attributes for nav-primary
 *
 * @param  array $atts     Menu item attributes
 * @param  WP_Post  $item  Menu item object
 * @param  stdClass $args  Nav menu args
 *
 * @return array Menu item attributes
 */
function nav_accordion_link_attributes( $atts, $item, $args ) {
	if ( 'nav-primary' === $args->theme_location ) {
		$atts['class'] = isset( $atts['class'] ) ? $atts['class'] : '';
		$atts['class'] .= ' nav-accordion__anchor';
	}
	return $atts;
}

/**
 * Add nav private item class
 *
 * Filter nav_menu_css_class for private content
 *
 * @param  array    $classes  Menu item classes
 * @param  WP_Post  $item  Menu item object
 * @param  stdClass $args  Nav menu args
 *
 * @return array Menu item classes
 */
function nav_private_item_class( $classes, $item, $args ) {
	if ( ! empty( $item->object_id ) && 'private' === get_post_status( $item->object_id ) ) {
		$classes[] = 'nav-accordion__item--private';
	}
	return $classes;
}

/**
 * Remove private items from menus when logged out.
 */
function nav_private_link_remove( $items, $menu, $args ) {
	if ( ! is_user_logged_in() ) {
		array_walk( $items, function( $item, $key ) use ( &$items ) {
			if (
				! empty( $item->object_id )
				&& 'private' === get_post_status( $item->object_id )
			) {
				unset( $items[ $key ] );
			}
		} );
	}
	return $items;
}
