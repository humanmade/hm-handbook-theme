<div class="StyleGuide_SearchContainer">
	<form class="SearchBar" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">

		<label class="SearchBar_Label" for="site-search"><?php esc_html_e( 'Search', 'hm-handbook' ); ?></label>

		<div class="SearchBar_Container">
			<input class="SearchBar_Field" type="search" id="site-search" placeholder="<?php esc_html_e( 'Search the site &hellip;', 'hm-handbook' ); ?>" value="<?php the_search_query(); ?>" name="s"/>
			<button class="SearchBar_Submit"><?php esc_html_e( 'Submit', 'hm-handbook' ); ?></button>
		</div>

	</form>
</div>
