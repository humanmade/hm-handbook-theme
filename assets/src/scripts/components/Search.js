// import 'whatwg-fetch';
// import debounce from 'lodash/debounce';
// import template from 'lodash/template';

// var init = function( searchBar ) {

// 	var searchField      = searchBar.querySelector( '.SearchBar_Field' ),
// 	    resultsContainer = searchBar.querySelector( '.SearchBar_Results' );

// 	if ( ! searchField || ! resultsContainer ) {
// 		return;
// 	}


// 	var resultTemplate = document.getElementById( 'tmpl-site-search-result' );
// 	var resultTemplateCompiled = template( resultTemplate ? resultTemplate.innerHTML.trim() : '<a href="<% url %>"><%- title %></a>' );

// 	/**
// 	 * Create a result item element
// 	 */
// 	var createResultItem = function( result ) {

// 		var html, tmp, div, width;

// 		// Create temporary element.
// 		// Set HTML, then grab first child.
// 		tmp = document.createElement( 'div' );
// 		tmp.innerHTML = resultTemplateCompiled( result );
// 		div = tmp.firstChild;

// 		// Ensure the width of search results is fixed.
// 		// Prevents styling issue as we animate the width of the container.
// 		var width = searchBar.offsetWidth;
// 		div.style.width = width + 'px;';

// 		return div;

// 	}

// 	/**
// 	 * Fetch search results and update results container.
// 	 */
// 	var fetchSearchResults = function( query ) {

// 		var api_endpoint = HMHandbookSearchSettings.api_endpoint;
// 		var api_nonce    = HMHandbookSearchSettings.api_nonce;

// 		api_endpoint += '?query=' + encodeURIComponent( query );

// 		fetch( api_endpoint, {
// 			credentials: 'include',
// 			headers: new Headers({
// 				'X-WP-Nonce': api_nonce
// 			}),
// 		} ).then( function( response ) {
// 			if ( response.ok ) {
// 				return response.json();
// 			}
// 		}).then( function( json ) {

// 			while ( resultsContainer.firstChild ) {
// 				resultsContainer.removeChild( resultsContainer.firstChild );
// 			}

// 			json.results.forEach( function( result ) {
// 				resultsContainer.appendChild( createResultItem( result ) );
// 			} )

// 			if ( json.results.length > 0 ) {
// 				searchBar.classList.add( 'SearchBar-HasResults' );
// 			} else {
// 				window.setTimeout( function() {
// 					searchBar.classList.remove( 'SearchBar-HasResults' );
// 				}, 500 );
// 			}

// 		});

// 	}

// 	// Get the height of the whole document.
// 	// Bit convoluted, taken from jQuery.
// 	var height = Math.max(
// 		document.body.scrollHeight,
// 		document.body.offsetHeight,
// 		document.documentElement.clientHeight,
// 		document.documentElement.scrollHeight,
// 		document.documentElement.offsetHeight
// 	);

// 	var adminBar = document.getElementById( 'wpadminbar' );

// 	if ( adminBar ) {
// 		height = height - adminBar.offsetHeight;
// 	}

// 	resultsContainer.style['max-height'] = ( height - 108 ) + 'px';

// 	var keyUpCallBack = function() {

// 		if ( searchField.value.length < 2 ) {
// 			return false;
// 		}

// 		fetchSearchResults( searchField.value )

// 	}

// 	searchField.addEventListener( "keyup", debounce( keyUpCallBack, 150 ) );

// 	// Prevent submission of the search form.
// 	searchBar.addEventListener( 'submit', function(e) {
// 		e.preventDefault();
// 	} );

// };

// export default {
// 	init: init,
// }
