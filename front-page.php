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

	<?php while ( have_posts() ) : the_post(); ?>
		<?php get_template_part( 'parts/article' ); ?>
	<?php endwhile; ?>

	<div class="util-GridRow">
		<div class="util-GridItem-6">
			<?php get_template_part( 'parts/widgets/latest-updates' ); ?>
		</div>
		<div class="util-GridItem-6">
			<?php get_template_part( 'parts/widgets/latest-content' ); ?>
		</div>
		<div class="util-GridItem-12">
			<?php get_template_part( 'parts/widgets/latest-comments' ); ?>
		</div>

	</div>

</div>

<div class="site-content-sidebar"></div>

<?php get_footer(); ?>
