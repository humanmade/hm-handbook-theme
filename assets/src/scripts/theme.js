import React from 'react';
import ReactDOM from 'react-dom';
import PageHistory from './components/PageHistory/PageHistory.js';
import SearchBar from './components/SearchBar/SearchBar.js';

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

var searchBarContainers = document.querySelectorAll( '.StyleGuide_SearchContainer' );

for ( var i = 0; i < searchBarContainers.length; i++ ) {

	while ( searchBarContainers[ i ].firstChild ) {
		searchBarContainers[ i ].removeChild( searchBarContainers[ i ].firstChild );
	}

	ReactDOM.render(
		<SearchBar query={ '' } containerEl={ searchBarContainers[ i ] } />,
		searchBarContainers[ i ]
	);

}
