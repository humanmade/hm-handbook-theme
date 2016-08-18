<?php
/**
 * hm-handbook functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package hm-handbook
 */

namespace HM_Handbook;

require_once( __DIR__ . '/inc/primary-nav.php' );
require_once( __DIR__ . '/inc/page-history.php' );
require_once( __DIR__ . '/inc/search.php' );

add_action( 'after_setup_theme',  __NAMESPACE__ . '\\setup' );
add_action( 'after_setup_theme',  __NAMESPACE__ . '\\content_width', 0 );
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts' );
add_action( 'admin_init',         __NAMESPACE__ . '\\setup_admin' );

/**
 * Set up the theme.
 */
function setup() {

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support( 'post-thumbnails' );

	// Enable custom site logo support
	add_theme_support( 'custom-logo' );

	// Switch default core markup for search form, comment form, and comments to output valid HTML5.
	add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ]	);

	// Show page history in the theme
	add_theme_support( 'hm-page-history' );

	// Register navigation menus.
	register_nav_menu( 'nav-primary', 'Main navigation' );

	// Filter next/prev post classes.
	add_filter( 'next_posts_link_attributes',     __NAMESPACE__ . '\\posts_link_attributes_next' );
	add_filter( 'previous_posts_link_attributes', __NAMESPACE__ . '\\posts_link_attributes_prev' );


}

function setup_admin() {

	add_editor_style( 'assets/dist/styles/editor.css' );

	add_filter( 'mce_external_plugins', function( $plugin_array ) {
		$plugin_array['typekit'] = get_template_directory_uri() . '/inc/tinyMCE/tinyMCE-typekit.js';
		return $plugin_array;
	} );

}

/**
 * Enqueue all theme scripts.
 */
function enqueue_scripts() {

	wp_register_script( 'hm-pattern-lib', get_parent_theme_file_uri( 'vendor/hm-pattern-library/assets/js/app.js' ), [], '1.0', true );
	wp_enqueue_script( 'hm-handbook', get_theme_file_uri( 'assets/dist/scripts/theme.js' ), [ 'hm-pattern-lib' ], '1.0', true );
	wp_enqueue_style( 'hm-handbook', get_theme_file_uri( 'assets/dist/styles/theme.css' ), [], '1.0' );

	add_action( 'wp_head', function() {
		echo '<script src="https://use.typekit.net/mwe8dvt.js"></script>';
		echo '<script>try{Typekit.load({ async: true });}catch(e){}</script>';
	} );

}

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function content_width() {
	$GLOBALS['content_width'] = 640;
}

/**
 * Retrieve the URL of a file in the theme.
 *
 * Searches in the stylesheet directory before the template directory so themes
 * which inherit from a parent theme can just override one file.
 *
 * @param string $file File to search for in the stylesheet directory.
 * @return string The URL of the file.
 */
function get_theme_file_uri( $file = '' ) {
	$file = ltrim( $file, '/' );

	if ( empty( $file ) ) {
		$url = get_stylesheet_directory_uri();
	} elseif ( file_exists( get_stylesheet_directory() . '/' . $file ) ) {
		$url = get_stylesheet_directory_uri() . '/' . $file;
	} else {
		$url = get_template_directory_uri() . '/' . $file;
	}

	return $url;
}

/**
 * Retrieve the URL of a file in the parent theme.
 *
 * @param string $file File to return the URL for in the template directory.
 * @return string The URL of the file.
 */
function get_parent_theme_file_uri( $file = '' ) {
	$file = ltrim( $file, '/' );

	if ( empty( $file ) ) {
		$url = get_template_directory_uri();
	} else {
		$url = get_template_directory_uri() . '/' . $file;
	}

	return $url;
}

/**
 * Add Class to pagination next links
 *
 * @return string Attributes.
 */
function posts_link_attributes_next() {
    return 'class="Btn Btn-Secondary Btn-Small Pagination-Next"';
}

/**
 * Add Class to pagination previous links
 *
 * @return string Attributes.
 */
function posts_link_attributes_prev() {
    return 'class="Btn Btn-Secondary Btn-Small Pagination-Prev"';
}
