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
			<div class="site-logo">

				<div class="site-logo">
					<a class="HMLogo HMLogo-White" href="<?php echo esc_url( home_url() ); ?>/">
						Human Made Limited
					</a>
				</div>

				<h1 class="site-title">Employee Handbook</h1>

			</div>
		<?php else : ?>
			<div class="site-logo">

				<a class="HMLogo HMLogo-White" href="<?php echo esc_url( home_url() ); ?>/">
					<?php bloginfo( 'name' ); ?>
				</a>

				<div class="site-title"><?php bloginfo( 'name' ); ?></div>

			</div>
		<?php endif; ?>

		<div class="site-search">
			 <?php echo get_search_form(); ?>
		</div>

	</header>

