<?php
/**
 * Template Name: Full Content
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

	<?php if ( is_front_page() ) : ?>
		<?php get_template_part( 'parts/updates' ); ?>
	<?php endif; ?>

	<?php if ( is_singular() && ( comments_open() || get_comments_number() ) ) : ?>
		<?php comments_template(); ?>
	<?php endif; ?>

</div>

<div class="site-content-sidebar">
	<?php if ( ! is_user_logged_in() ) {
		dynamic_sidebar( 'site-content-logged-out' );
	} ?>
</div>

<?php get_footer(); ?>
