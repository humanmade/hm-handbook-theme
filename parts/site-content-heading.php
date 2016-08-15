<?php if ( is_search() ) : ?>

	<div class="site-content-header">
		<p class="site-content-header-title-pre">Search results</p>
		<h1 class="site-content-header-title">&ldquo;<?php the_search_query(); ?>&rdquo;</h1>
	</div>

<?php elseif ( is_category() || is_tag() || is_tax() ) : ?>

	<?php
	$term  = get_queried_object();
	$tax   = get_taxonomy( $term->taxonomy );
	$title = single_term_title( '', false );
	$desc  = term_description();
	?>

	<div class="site-content-header">

		<p class="site-content-header-title-pre">
			<?php printf( __( '%s Archive', 'handbook' ), esc_html( $tax->labels->singular_name ) ); ?>
		</p>

		<h1 class="site-content-header-title"><?php echo esc_html( $title ) ?></h1>

		<?php if ( ! empty( $desc ) ) : ?>
			<div class="site-content-header-title-description">
				<?php echo wp_kses_post( $desc ); ?>
			</div>
		<?php endif; ?>

	</div>

<?php elseif ( is_author() ) : ?>

	<?php
	the_post(); // To grab the author from the first post.
	$desc = get_the_author_meta( 'description' );
	?>

	<div class="site-content-header">

		<p class="site-content-header-title-pre"><?php esc_html_e( 'Author Archive', 'handbook' ); ?></p>

		<h1 class="site-content-header-title"><?php echo esc_html( get_the_author() ); ?></h1>

		<?php if ( ! empty( $desc ) ) : ?>
			<div class="site-content-header-title-description">
				<?php echo wp_kses_post( wpautop( $desc ) ); ?>
			</div>
		<?php endif; ?>

	</div>

	<?php rewind_posts(); // undo calling the_post(). ?>

<?php elseif ( is_date() ) : ?>

	<div class="site-content-header">

		<p class="site-content-header-title-pre">
			<?php
			if ( is_day() ) {
				esc_html_e( 'Daily Archives', 'handbook' );
			} elseif ( is_month() ) {
				esc_html_e( 'Monthly Archives', 'handbook' );
			} elseif ( is_year() ) {
				esc_html_e( 'Yearly Archives', 'handbook' );
			}
			?>
		</p>

		<h2 class="site-content-header-title">
			<?php
			if ( is_day() ) {
				echo esc_html( get_the_date() );
			} elseif ( is_month() ) {
				echo esc_html( get_the_date( 'F Y' ) );
			} elseif ( is_year() ) {
				echo esc_html( get_the_date( 'Y' ) );
			} else {
				esc_html_e( 'Date Archives', 'handbook' );
			}
			?>
		</h2>

	</div>

<?php endif; ?>
