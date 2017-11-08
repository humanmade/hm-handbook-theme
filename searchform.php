<div class="search-container">
	<form class="search-bar" role="search" method="get" action="<?php echo esc_url( home_url() ); ?>">

		<label class="search-bar__label" for="site-search"><?php esc_html_e( 'Search', 'hm-handbook' ); ?></label>

		<div class="search-bar__container">
			<input class="search-bar__field" type="search" id="site-search" placeholder="<?php esc_html_e( 'Search the site &hellip;', 'hm-handbook' ); ?>" value="<?php the_search_query(); ?>" name="s"/>
			<button class="search-bar__submit" type="submit"><?php esc_html_e( 'Submit', 'hm-handbook' ); ?></button>
		</div>

	</form>
</div>
