import React from 'react';
import ReactDOM from 'react-dom';
import PageHistory from './PageHistory';

var init = function() {

	var revisions, container, el;

	revisions = window.HMHandbookPageHistory;
	container = document.querySelectorAll( 'body.single-post .site-content .article, body.page .site-content .article' );

	if ( ! container.length ) {
		return;
	}

	container = container[0];
	el        = document.createElement( 'DIV' );

	container.appendChild( el );

	console.log( PageHistory );

	// ReactDOM.render( <PageHistory revisions={ revisions } />, el );

}

module.exports = {
	init: init,
};

