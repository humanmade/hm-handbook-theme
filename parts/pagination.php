<?php

global $wp_query;

// Return if not more than 1 page.
if ( $wp_query->max_num_pages <= 1 ) {
	return;
}

?>

<div class="Pagination">
	<?php previous_posts_link( 'Previous Page' ); ?>
	<?php next_posts_link( 'Next Page' ); ?>
</div>
