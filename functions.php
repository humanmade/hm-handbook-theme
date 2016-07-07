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

add_action( 'after_setup_theme',  __NAMESPACE__ . '\\setup' );
add_action( 'after_setup_theme',  __NAMESPACE__ . '\\content_width', 0 );
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts' );

/**
 * Set up the theme.
 */
function setup() {

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ]	);

	/*
	 * Enable support for Post Formats.
	 * See https://developer.wordpress.org/themes/functionality/post-formats/
	 */
	add_theme_support( 'post-formats', [] );

	/**
	 * Register navigation menus.
	 */
	register_nav_menu( 'nav-primary', 'Main navigation' );

}

/**
 * Enqueue all theme scripts.
 */
function enqueue_scripts() {

	wp_register_script( 'hm-pattern-lib', get_stylesheet_directory_uri() . '/vendor/hm-pattern-library/dist/assets/js/app.js', [], '1.0', true );
	wp_enqueue_script( 'hm-handbook', get_stylesheet_directory_uri() . '/assets/dist/scripts/theme.js', [ 'hm-pattern-lib' ], '1.0', true );
	wp_enqueue_style( 'hm-handbook', get_stylesheet_directory_uri() . '/assets/dist/styles/theme.css', [], '1.0' );

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
