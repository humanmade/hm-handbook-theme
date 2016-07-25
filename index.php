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

<div class="site-container">

	<?php echo get_sidebar(); ?>

	<main class="site-content">

		<div class="site-content-inner">

			<?php get_template_part( 'parts/site-content-heading' ); ?>

			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'parts/article' ); ?>
			<?php endwhile; ?>

			<?php if ( ! is_singular() ) : ?>
				<?php get_template_part( 'parts/pagination' ); ?>
			<?php endif; ?>

		</div>

		<div class="site-content-sidebar">
			Site content sidebar. Itaque nostrum est-quod nostrum dico, artis est-ad ea principia, quae accepimus. At cum de plurimis eadem dicit, tum certe de maximis. Sed in rebus apertissimis nimium longi sumus. Odium autem et invidiam facile vitabis.

Ut non sine causa ex iis memoriae ducta sit disciplina. Tamen a proposito, inquam, aberramus. Sin tantum modo ad indicia veteris memoriae cognoscenda, curiosorum.

An vero displicuit ea, quae tributa est animi virtutibus tanta praestantia? Aut, Pylades cum sis, dices te esse Orestem, ut moriare pro amico? Venit enim mihi Platonis in mentem, quem accepimus primum hic disputare solitum;
		</div>

	</main>

</div>

<?php get_footer(); ?>
