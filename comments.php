<?php
/**
 * The template for displaying comments
 *
 * @package hm-handbook
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}

// Don't show anything if no comments, and comments are closed.
if ( ! have_comments() && ! comments_open() ) {
	return;
}

?>

<div id="comments" class="comments-area">

	<?php if ( have_comments() ) : ?>

		<h3 class="comments-title">
			<?php
			$string = _nx( 'One comment', '%1$s comments', get_comments_number(), 'comments title', 'hm-handbook' );
			printf( $string, number_format_i18n( get_comments_number() ), get_the_title() );
			?>
		</h3>

		<ol class="comment-list">
			<?php
			wp_list_comments( array(
				'style'       => 'ol',
				'short_ping'  => true,
				'avatar_size' => 54,
			) );
			?>
		</ol><!-- .comment-list -->

	<?php endif; // have_comments() ?>

	<?php if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) : ?>
		<p class="no-comments"><?php _e( 'Comments are closed.', 'hm-handbook' ); ?></p>
	<?php endif; ?>

	<?php comment_form(); ?>

</div><!-- .comments-area -->
