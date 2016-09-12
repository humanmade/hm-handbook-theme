<?php
/**
 * Template Name: Updates
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
