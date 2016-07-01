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

<div id="site-container">

	<?php echo get_sidebar(); ?>

	<main id="site-content">

		<?php while ( have_posts() ) : the_post(); ?>

			<article <?php post_class(); ?>>

				<h1><?php the_title(); ?></h1>

				<?php the_content(); ?>

			</article>

		<?php endwhile; ?>

	</main>

</div>

<?php get_footer(); ?>
