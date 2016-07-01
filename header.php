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

		<?php if ( is_front_page() ) : ?>
			<h1 class="site-logo">
				<a class="Logo" href="<?php echo esc_url( home_url() ); ?>/">
					<?php bloginfo( 'name' ); ?>
				</a>
			</h1>
		<?php else : ?>
			<div class="site-logo">
				<a class="Logo" href="<?php echo esc_url( home_url() ); ?>/">
					<?php bloginfo( 'name' ); ?>
				</a>
			</div>
		 <?php endif; ?>

		 <?php echo get_search_form(); ?>

	</header>
