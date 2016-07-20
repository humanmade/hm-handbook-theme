import React from 'react';
import ReactDOM from 'react-dom';
import PageHistory from './components/PageHistory/PageHistory.js';

if ( 'HMHandbookPageHistory' in window ) {

	var revisions, containers;

	containers = document.querySelectorAll( 'body.single-post .site-content .article, body.page .site-content .article' );

	for ( var i = 0; i < containers.length; i++ ) {
		let el = document.createElement( 'DIV' );
		let id = parseInt( window.HMHandbookPageHistory.post_id, 10 );
		containers[ i ].appendChild( el );
		ReactDOM.render( <PageHistory post_id={ id } containerEl={ containers[ i ] } />, el );
	}

}

( function() {

	var searchField      = document.getElementById( 'site-search' );
	var resultsContainer = document.getElementById( 'site-search-results' );
	var searchBar        = document.querySelector( '.SearchBar' );

	if ( ! searchField || ! resultsContainer ) {
		return;
	}

	var createResultItem = function( result ) {

		var div = document.createElement( 'div' );
		div.classList.add( 'SearchBar_Result' );

		var a = document.createElement( 'A' );
		a.setAttribute( 'href', result.url )
		div.appendChild( a );

		if ( 'title' in result && result.title.length > 0 ) {
			var title = document.createElement( 'H3' );
			title.classList.add( 'SearchBar_Result_Title' );
			title.appendChild( document.createTextNode( result.title ) );
			a.appendChild( title );
		}

		var content = document.createElement( 'DIV' );
		content.classList.add( 'SearchBar_Result_Text' );
		content.appendChild( document.createTextNode( result.excerpt ) );
		a.appendChild( content );

		// Ensure the width of search results is fixed.
		// Prevents styling issue as we animate the width of the container.
		var width = searchBar.offsetWidth;
		div.style = 'width:' + width + 'px;';

		return div;

	}

	var fetchSearchResults = function( query ) {

		var api_endpoint = HMHandbookSearchSettings.api_endpoint;
		var api_nonce    = HMHandbookSearchSettings.api_nonce;

		api_endpoint += '?query=' + encodeURIComponent( query );

		fetch( api_endpoint, {
			credentials: 'include',
			headers: new Headers({
				'X-WP-Nonce': api_nonce
			}),
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

	var container, body, html, height, adminBar;

	container = document.getElementById( 'site-search-results' );
	adminBar  = document.getElementById( 'wpadminbar' );
	body      = document.body;
	html      = document.documentElement;

	height = Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight
	);

	if ( adminBar ) {
		height = height - adminBar.offsetHeight;
	}

	resultsContainer.style['max-height'] = ( height - 108 ) + 'px';

	searchField.addEventListener( "keyup", function() {

		if ( searchField.value.length < 2 ) {
			return false;
		}

		fetchSearchResults( searchField.value );

	} );

} )();
