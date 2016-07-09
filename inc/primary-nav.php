<?php

namespace HM_Handbook;

add_filter( 'nav_menu_css_class',       __NAMESPACE__ . '\\nav_accordion_item_class' , 10 , 3 );
add_filter( 'nav_menu_link_attributes', __NAMESPACE__ . '\\nav_accordion_link_attributes' , 10 , 3 );

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
		$classes[] = 'NavAccordion_Item';

		if ( array_intersect( $classes, [ 'current-menu-item' ] ) ) {
			$classes[] = 'NavAccordion_Item-Active';
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
		$atts['class'] .= ' NavAccordion_Anchor';
	}

	return $atts;
}
