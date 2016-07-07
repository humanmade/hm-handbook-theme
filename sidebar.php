<?php
/**
 * The sidebar file.
 *
 * @package hm-handbook
 */

namespace HM_Handbook; ?>

<nav class="site-sidebar">

	<?php

	wp_nav_menu( [
		'theme_location' => 'nav-primary',
		'menu_class'     => 'NavAccordion',
	] );

	?>

</nav>
