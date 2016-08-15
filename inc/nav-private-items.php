<?php

namespace HM_Handbook;

add_filter( 'nav_menu_css_class',       __NAMESPACE__ . '\\nav_private_item_class' , 10 , 3 );
add_filter( 'wp_get_nav_menu_items',    __NAMESPACE__ . '\\nav_private_link_remove' , 10 , 3 );

/**
 * Add nav private item class
 *
 * Filter nav_menu_css_class for private content
 *
 * @param  array $classes  Menu item classes
 * @param  WP_Post  $item  Menu item object
 * @param  stdClass $args  Nav menu args
 *
 * @return array Menu item classes
 */
function nav_private_item_class( $classes, $item, $args ) {

	if ( ! empty( $item->object_id ) && 'private' === get_post_status( $item->object_id ) ) {
		$classes[] = 'Nav_Item-Private';
	}

	return $classes;

}

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


function nav_filter_private_title_format( $format ) {
	return '🔒 %s';
}

add_filter( 'private_title_format', __NAMESPACE__ . '\\nav_filter_private_title_format' );
