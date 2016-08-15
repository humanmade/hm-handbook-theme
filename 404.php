<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package hm-handbook
 */

namespace HM_Handbook;

get_header();

?>

<div class="site-content">

	<div class="article">
		<h1 class="article-title">
			<?php esc_html_e( 'Sorry!', 'handbook' ); ?><br />
			<?php esc_html_e( 'Page not found.', 'handbook' ); ?>
		</h1>
	</div>
</div>

<div class="site-content-sidebar"></div>

<?php get_footer(); ?>
