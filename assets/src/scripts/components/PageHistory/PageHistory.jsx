import React from 'react';
import PageHistoryDiff from './PageHistoryDiff.jsx';
import PageHistoryList from './PageHistoryList.jsx';

export default class PageHistory extends React.Component {

	constructor( props ) {

	    super( props );

		this.state = {
			revisions: this.props.revisions,
			diff: { a: null, b: null },
		};

	}

	render() {

		const actions = {
			onSelectRevision: revision => { this.onSelectRevision( revision ) }
		};

		return (
			<div>
				<PageHistoryDiff diff_a={ this.state.diff.a } diff_b={ this.state.diff.b } />
				<PageHistoryList revisions={ this.state.revisions } actions={ actions } />
			</div>
		);
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

		this.props.revisions.forEach( function( _revision, i ) {
			if ( _revision.id === revision.id )  {
				currentIndex = i;
			}
		} );

		if ( 'undefined' === typeof currentIndex ) {
			return null;
		}

		if ( currentIndex < this.props.revisions.length - 1 ) {
			revision_b = this.props.revisions[ currentIndex + 1 ];
		} else {
			revision_b = this.props.revisions[ this.props.revisions.length - 1 ];
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

		this.setState({
			revisions: newRevisions,
			diff:      {
				a: revision.content,
				b: this.getNextRevision( revision ).content
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
