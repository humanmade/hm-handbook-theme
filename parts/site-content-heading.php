<?php if ( is_search() ) : ?>

	<div class="site-content-header">
		<p class="site-content-header-title-pre">Search results</p>
		<h1 class="site-content-header-title">&ldquo;<?php the_search_query(); ?>&rdquo;</h1>
	</div>

<?php elseif ( is_category() || is_tag() || is_tax() ) : ?>

	<div class="site-content-header">

		<p class="site-content-header-title-pre">
			<?php
			$term  = get_queried_object();
			$tax   = get_taxonomy( $term->taxonomy );
			printf( __( '%s Archive', 'hm-handbook' ), esc_html( $tax->labels->singular_name ) );
			?>
		</p>

		<h1 class="site-content-header-title"><?php echo esc_html( single_term_title( '', false ) ) ?></h1>

		<?php
		$desc = term_description();
		if ( ! empty( $desc ) ) : ?>
			<div class="site-content-header-title-description">
				<?php echo wp_kses_post( $desc ); ?>
			</div>
		<?php endif; ?>

	</div>

<?php elseif ( is_author() ) : ?>

	<div class="site-content-header">

		<p class="site-content-header-title-pre"><?php esc_html_e( 'Author Archive', 'hm-handbook' ); ?></p>

		<h1 class="site-content-header-title"><?php echo esc_html( get_the_author() ); ?></h1>

		<?php
		$desc = get_the_author_meta( 'description' );
		if ( ! empty( $desc ) ) : ?>
			<div class="site-content-header-title-description">
				<?php echo wp_kses_post( wpautop( $desc ) ); ?>
			</div>
		<?php endif; ?>

	</div>

<?php elseif ( is_date() ) : ?>

	<div class="site-content-header">

		<p class="site-content-header-title-pre">
			<?php
			if ( is_day() ) {
				esc_html_e( 'Daily Archives', 'hm-handbook' );
			} elseif ( is_month() ) {
				esc_html_e( 'Monthly Archives', 'hm-handbook' );
			} elseif ( is_year() ) {
				esc_html_e( 'Yearly Archives', 'hm-handbook' );
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
				esc_html_e( 'Date Archives', 'hm-handbook' );
			}
			?>
		</h2>

	</div>

<?php endif; ?>
