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
require_once( __DIR__ . '/inc/editor-mods.php' );
require_once( __DIR__ . '/inc/updates.php' );

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

	// Disable support for Post Thumbnails on posts and pages.
	remove_theme_support( 'post-thumbnails' );

	// Enable custom site logo support
	add_theme_support( 'custom-logo' );

	// Switch default core markup for search form, comment form, and comments to output valid HTML5.
	add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ]	);

	// Show page history in the theme
	add_theme_support( 'hm-page-history' );

	// Register navigation menus.
	register_nav_menu( 'nav-primary', 'Main navigation' );

	// Register Sidebars.
	register_sidebar( [
		'name'          => __( 'Content Siedebar (Logged Out)', 'hm-handbook' ),
		'id'            => 'site-content-logged-out',
		'description'   => __( 'Shown only to logged out visitors.', 'hm-handbook' ),
		'class'         => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>'
	] );
	register_sidebar( [
		'name'          => __( 'Footer Content', 'hm-handbook' ),
		'id'            => 'footer-content',
		'description'   => __( 'Show in the site footer.', 'hm-handbook' ),
		'class'         => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>'
	] );
	
	// Filter next/prev post classes.
	add_filter( 'next_posts_link_attributes',     __NAMESPACE__ . '\\posts_link_attributes_next' );
	add_filter( 'previous_posts_link_attributes', __NAMESPACE__ . '\\posts_link_attributes_prev' );

	add_filter( 'private_title_format', __NAMESPACE__ . '\\filter_private_title_format' );
	add_filter( 'wp_link_pages_link', __NAMESPACE__ . '\\multi_page_links_markup', 10, 2 );

}

/**
 * Set up the admin.
 */
function setup_admin() {

	add_editor_style( 'assets/dist/styles/editor.css' );

	add_filter( 'mce_external_plugins', function( $plugin_array ) {
		$plugin_array['typekit'] = get_template_directory_uri() . '/inc/tinyMCE/tinyMCE-typekit.js';
		return $plugin_array;
	} );

}

/**
 * Add login Styling
 */
add_action( 'login_enqueue_scripts', function() {
	wp_enqueue_style( 'hm-login', get_theme_file_uri( 'assets/dist/styles/login.css' ), [], wp_get_theme()->Version );
} );

/**
 * Enqueue all theme scripts.
 */
function enqueue_scripts() {

	wp_enqueue_script( 'hm-handbook', get_theme_file_uri( 'assets/dist/scripts/theme.js' ), [], '1.0', true );
	wp_enqueue_style( 'hm-handbook', get_theme_file_uri( 'assets/dist/styles/theme.css' ), [], '1.0' );

	add_action( 'wp_head', function() {
		echo '<script src="https://use.typekit.net/mwe8dvt.js"></script>';
		echo '<script>try{Typekit.load({ async: true });}catch(e){}</script>';
	} );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

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

/**
 * Add indicative icon to private page titles
 *
 * @return string Title format.
 */
add_filter( 'private_title_format', function( $format ) {
	return '🔒 %s';
} );

/**
 * Handle the markup for multi-page posts.
 */
function multi_page_links_markup( $link, $i ) {

	global $page;

	if ( $i === $page ) {
		$link = '<span class="Pagination-Current">' . $link . '</span>';
	}

	return $link;

}

/**
 * Redirect private pages to a hiring page if a user is logged out
 */
function redirect_private_pages() {
	$queried_object = get_queried_object();
	if ( isset( $queried_object->post_status ) && 'private' === $queried_object->post_status && ! is_user_logged_in() ) {
		wp_redirect( home_url( '/join-human-made/' ) );
		exit();
	}
}
add_action( 'pre_get_posts', 'HM_Handbook\redirect_private_pages' );
