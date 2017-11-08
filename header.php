<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package hm-handbook
 */

namespace HM_Handbook;

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

	<header class="site-header">

		<div class="site-logo">
			<?php
				if ( has_custom_logo() ) {
					the_custom_logo();
				} else {
					echo '<a class="hm-logo hm-logo--white" href ="' . esc_url( home_url('/') ) . '">Human Made Limited</a>';
				}

				if ( is_front_page() ) {
					echo '<h1 class="site-title">' . get_bloginfo( 'name' ) . '</h1>';
				} else {
					echo '<div class="site-title">' . get_bloginfo( 'name' ) . '</div>';
				}
			?>
		</div>

		<div class="site-search">
			 <?php echo get_search_form(); ?>
		</div>

	</header>

	<div class="site-container">

		<?php echo get_sidebar(); ?>

		<main class="site-content-container">
