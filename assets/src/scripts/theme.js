( function() {

	var searchField      = document.getElementById( 'site-search' );
	var resultsContainer = document.getElementById( 'site-search-results' );
	var searchBar        = document.querySelector( '.SearchBar' );

	if ( ! searchField || ! resultsContainer ) {
		return;
	}

	var createResultItem = function( result ) {

		var li = document.createElement( 'LI' );
		li.classList.add( 'SearchBar_Result' );

		var a = document.createElement( 'A' );
		a.setAttribute( 'href', result.permalink )
		li.appendChild( a );

		if ( 'title' in result && result.title.length > 0 ) {
			var title = document.createElement( 'H3' );
			title.classList.add( 'SearchBar_Result_Title' );
			title.appendChild( document.createTextNode( result.title ) );
			a.appendChild( title );
		}

		var content = document.createElement( 'DIV' );
		content.classList.add( 'SearchBar_Result_Text' );
		content.appendChild( document.createTextNode( result.content ) );
		a.appendChild( content );

		// Ensure the width of search results is fixed.
		// Prevents styling issue as we animate the width of the container.
		var width = searchBar.offsetWidth - 30;
		li.style = 'width:' + width + 'px;';

		return li;

	}

	var fetchSearchResults = function( query ) {

		var url = 'http://wordpress-trunk.dev/wp-json/hm-handbook/v1/search?query=' + encodeURIComponent( query );

		fetch( url, {
			credentials: 'include',
			// headers: new Headers({
			// 	'X-WP-Nonce': PageHistorySettings.api_nonce
			// }),
		} ).then( function( response ) {
			if ( response.ok ) {
				return response.json();
			}
		}).then( function( json ) {

			while ( resultsContainer.firstChild ) {
				resultsContainer.removeChild( resultsContainer.firstChild );
			}

			json.forEach( function( result ) {
				resultsContainer.appendChild( createResultItem( result ) );
			} )

			if ( json.length > 0 ) {
			searchBar.classList.add( 'SearchBar-HasResults' );
			} else {
				window.setTimeout( function() {
					searchBar.classList.remove( 'SearchBar-HasResults' );
				}, 500 );
			}

		});

	}

	var container = document.getElementById( 'site-search-results' );

	searchField.addEventListener( "keyup", function() {

		if ( searchField.value.length < 2 ) {
			return false;
		}

		fetchSearchResults( searchField.value );

	} );

} )();
