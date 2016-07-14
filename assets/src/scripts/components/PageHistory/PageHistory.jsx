import React from 'react';
import PageHistoryDiff from './PageHistoryDiff.jsx';
import PageHistoryList from './PageHistoryList.jsx';

export default class PageHistory extends React.Component {

	constructor( props ) {

	    super( props );

		this.state = {
			revisions: this.props.revisions,
			diff:      { a: null, b: null },
			page:      1,
			hasMore:   true,
			loading:   false,
		};

	}

	render() {

		var actions = {
			onSelectRevision: revision => { this.onSelectRevision( revision ) },
			onFetchRevisions: () => { this.onfetchRevisions() },
		};

		return (
			<div>
				<PageHistoryDiff diff_a={ this.state.diff.a } diff_b={ this.state.diff.b } />
				<PageHistoryList revisions={ this.state.revisions } loading={ this.state.loading } hasMore={ this.state.hasMore } actions={ actions } />
			</div>
		);
	}

	onfetchRevisions() {

		if ( ! this.state.hasMore ) {
			return;
		}

		var id     = window.HMHandbookPageHistory.post_id;
		var base   = window.HMHandbookPageHistory.api_base;
		var nonce  = window.HMHandbookPageHistory.api_nonce;
		var page   = this.state.page;

		var url = base + 'posts/' + id + '/revisions/?paged=' + page;

		var request = new Request( url, {
			headers: new Headers({
				'X-WP-Nonce': nonce
			})
		});

		this.setState( { loading: true } );

		fetch( request ).then( response => {
			return response.json();
		}).then( json => {

			this.setState( {
				revisions: this.state.revisions.concat( json.revisions ),
				page:      this.state.page += 1,
				loading:   false,
				hasMore:   json.hasMore,
			} );

			window.setTimeout( () => {
				console.log( json );
			} );

		} );

	}

	/**
	 * Get the revision to compare against.
	 * This should always be the next most recent revision.
	 */
	getNextRevision( revision ) {

		var currentIndex, revision_b;

		if ( ! revision ) {
			return null;
		}

		this.state.revisions.forEach( function( _revision, i ) {
			if ( _revision.id === revision.id )  {
				currentIndex = i;
			}
		} );

		if ( 'undefined' === typeof currentIndex ) {
			return null;
		}

		if ( currentIndex < this.state.revisions.length - 1 ) {
			revision_b = this.state.revisions[ currentIndex + 1 ];
		} else {
			revision_b = this.state.revisions[ this.state.revisions.length - 1 ];
		}

		return revision_b;

	}

	onSelectRevision( revision ) {

		// If trying to select again, clear.
		if ( this.state.diff.a && revision.id === this.state.diff.a.id ) {
			revision = null;
		}

		// Update active state for each revision.
		var newRevisions = this.state.revisions.map( function( _revision ) {

			if ( revision && revision.id === _revision.id ) {
				_revision.active = true;
			} else {
				_revision.active = false;
			}

			return _revision;

		} );

		var revision_b = this.getNextRevision( revision );

		this.setState({
			revisions: newRevisions,
			diff:      {
				a: revision.content,
				b: revision_b.content
			},
		});

		// Defer until actually set.
		window.setTimeout( () => {
			this.toggleContainerClass();
		} );

	}

	toggleContainerClass() {

		var container = document.querySelectorAll( 'body.single-post .site-content .article, body.page .site-content .article' );

		if ( container.length < 1 ) {
			return;
		}

		if  ( null === this.state.diff.a || null === this.state.diff.b ) {
			container[0].classList.remove( 'article-showing-diff' );
		} else {
			container[0].classList.add( 'article-showing-diff' );
		}

	}

}


PageHistoryDiff.propTypes = {
	revisions: React.PropTypes.array,
};


PageHistory.defaultProps = {
	revisions: []
}
