<?php

$comments = get_comments([
	'number' => 5
]);

?>

<div class="Widget">

	<h4 class="Widget_Title">Recent Comments</h4>

	<ul class="PostList">
		<?php foreach ( $comments as $comment ) : ?>

			<?php

			$comment_post_link = sprintf(
				'%s#comment-%s',
				get_permalink( $comment->comment_post_ID ),
				absint( $comment->comment_ID )
			);

			?>

			<li class="PostList_Item">
				<a class="PostList_Item_Link" href="<?php echo esc_url( $comment_post_link ); ?>">
					<b>On &ldquo;<?php echo esc_html( get_the_title( $comment->comment_post_ID ) ); ?>&rdquo; by <?php echo esc_html( $comment->comment_author ); ?>.</b>
					<em><?php echo esc_html( get_comment_date( 'jS F, Y', $comment->comment_ID ) ); ?>.</em>
					<br/>
					<?php echo wp_kses_post( $comment->comment_content ); ?>
				</a>
			</li>

		<?php endforeach; ?>
	</ul>

</div>

<?php

wp_reset_postdata();
