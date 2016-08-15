<?php

$comments = get_comments();

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
					<b><?php echo esc_html( $comment->comment_author ); ?>.</b>
					<em><?php echo esc_html( get_comment_date( 'jS F, Y', $comment->comment_ID ) ); ?>.</em>
					<br/>
					<?php echo wp_kses_post( '<small>' . $comment->comment_content . '</small>' ); ?>
				</a>
			</li>

		<?php endforeach; ?>
	</ul>

</div>

<?php

wp_reset_postdata();
