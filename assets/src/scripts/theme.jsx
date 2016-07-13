import React from 'react';
import ReactDOM from 'react-dom';
import PageHistory from './components/PageHistory/PageHistory.jsx';

var revisions, containers;

revisions = window.HMHandbookPageHistory.revisions;
containers = document.querySelectorAll( 'body.single-post .site-content .article, body.page .site-content .article' );

containers.forEach( function( containerEl ) {
	var el = document.createElement( 'DIV' );
	containerEl.appendChild( el );
	ReactDOM.render( <PageHistory revisions={ revisions } />, el );
} );
