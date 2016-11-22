<?php
/**
 * Generic article component template part.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package hm-handbook
 */

namespace HM_Handbook;

?>

<article <?php post_class( 'article' ); ?>>

	<?php if ( is_singular() ) : ?>

		<h1 class="article-title">
			<?php the_title(); ?>
		</h1>

	<?php else : ?>

		<h2 class="article-title">
			<a href="<?php the_permalink(); ?>">
				<?php the_title(); ?>
			</a>
		</h2>

	<?php endif; ?>

	<div class="article-content">
		<?php is_singular() ? the_content() : the_excerpt(); ?>
	</div>

</article>
