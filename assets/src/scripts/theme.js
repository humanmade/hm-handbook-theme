import React from 'react';
import ReactDOM from 'react-dom';
import PageHistory from './components/PageHistory/PageHistory.js';

var revisions, containers;

containers = document.querySelectorAll( 'body.single-post .site-content .article, body.page .site-content .article' );

for ( var i = 0; i < containers.length; i++ ) {
	let el = document.createElement( 'DIV' );
	containers[ i ].appendChild( el );
	ReactDOM.render( <PageHistory post_id={}/>, el );
}
