<?php
/**
 * 404 page template.
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
