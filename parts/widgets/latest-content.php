<?php

$args = [
	'post_type'      => [ 'post', 'page' ],
	'orderby'        => [ 'date', 'title' ],
	'posts_per_page' => 5,
	'no_found_rows'  => true,
];

$query = new WP_Query( $args );

?>

<div class="Widget">

	<h4 class="Widget_Title">Recently added</h4>

	<ul class="PostList">
		<?php while ( $query->have_posts() ) : $query->the_post(); ?>
			<li class="PostList_Item">
				<a class="PostList_Item_Link" href="<?php the_permalink(); ?>">
					<?php the_title(); ?>
				</a>
			</li>
		<?php endwhile; ?>
	</ul>

</div>

<?php

wp_reset_postdata();
