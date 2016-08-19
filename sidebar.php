<?php
/**
 * The sidebar file.
 *
 * @package hm-handbook
 */

namespace HM_Handbook;

?>

<nav class="site-sidebar">
	<?php

	if ( has_nav_menu( 'nav-primary' ) ) {

		wp_nav_menu( [
			'theme_location' => 'nav-primary',
			'menu_class'     => 'NavAccordion',
		] );

	} else {

		render_nav_list();

	}

	?>
</nav>
