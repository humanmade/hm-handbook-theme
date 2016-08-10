<?php if ( is_search() ) : ?>
	<div class="site-content-header">
		<h1 class="site-content-header-title">Search results</h1>
		<p>Showing results for <em>&ldquo;<?php the_search_query(); ?>&rdquo;</em></p>
	</div>
<?php elseif ( is_category() || is_tag() || is_tax() ) : ?>
	<div class="site-content-header">
		<?php $queried_object = get_queried_object(); ?>
		<h1 class="site-content-header-title"><?php echo esc_html( $queried_object->name ); ?></h1>
	</div>
<?php endif; ?>
