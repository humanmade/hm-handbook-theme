<?php
/**
 * Updates section on the home page.
 *
 * @package hm-handbook
 */

namespace HM_Handbook;

?>

<div class="updates">

	<h2 class="updates--heading"><?php esc_html_e( 'Updates', 'hm-handbook' ); ?></h2>

	<div class="updates--box">

		<h3 class="updates--heading"><?php esc_html_e( 'Latest pages', 'hm-handbook' ); ?></h3>

		<?php latest_pages(); ?>

	</div>

	<div class="updates--box">

		<h3 class="updates--heading"><?php esc_html_e( 'Recent edits', 'hm-handbook' ); ?></h3>

		<ol class="updates--list">
			<li class="updates--list-item"><a class="updates--link" href="#">Lorem ipsum</a></li>
			<li class="updates--list-item"><a class="updates--link" href="#">Lorem ipsum</a></li>
			<li class="updates--list-item"><a class="updates--link" href="#">Lorem ipsum</a></li>
			<li class="updates--list-item"><a class="updates--link" href="#">Lorem ipsum</a></li>
			<li class="updates--list-item"><a class="updates--link" href="#">Lorem ipsum</a></li>
		</ol>

	</div>

</div>
