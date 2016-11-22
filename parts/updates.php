<?php
/**
 * Updates section on the home page.
 *
 * @package hm-handbook
 */

namespace HM_Handbook;

?>

<div class="updates">

	<div class="updates--box">

		<h3 class="updates--heading"><?php esc_html_e( 'Latest pages', 'hm-handbook' ); ?></h3>

		<?php display_latest( 'posts' ); ?>

	</div>

	<div class="updates--box">

		<h3 class="updates--heading"><?php esc_html_e( 'Recent edits', 'hm-handbook' ); ?></h3>

		<?php display_latest( 'edits' ); ?>

	</div>

</div>
