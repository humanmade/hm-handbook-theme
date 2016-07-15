import React from 'react';
import PageHistoryDiff from './PageHistoryDiff.js';
import PageHistoryList from './PageHistoryList.js';
import PageHistorySettings from './PageHistorySettings.js';

import 'whatwg-fetch';

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
			onSelectRevision: ( revision ) => { this.onSelectRevision( revision ) },
			onFetchRevisions: () => { this.onfetchRevisions() },
			onClearDiff:      () => { this.onClearDiff() },
		};

		return <div>
			<PageHistoryDiff diff_a={ this.state.diff.a } diff_b={ this.state.diff.b } />
			<PageHistoryList revisions={ this.state.revisions } loading={ this.state.loading } hasMore={ this.state.hasMore } actions={ actions } />
		</div>

	}

	onfetchRevisions() {

		if ( ! this.state.hasMore || this.state.loading ) {
			return;
		}

		this.setState( { loading: true } );

		var base   = PageHistorySettings.api_base;
		var nonce  = PageHistorySettings.api_nonce;
		var page   = this.state.page;
		var url    = base + 'posts/' + this.props.post_id + '/revisions/?paged=' + page;

		var request = new Request( url, {
			credentials: 'include',
			headers: new Headers({
				'X-WP-Nonce': nonce
			})
		});

		fetch( request ).then( response => {
			return response.json();
		}).then( json => {

			this.setState( {
				revisions: this.state.revisions.concat( json.revisions ),
				page:      this.state.page += 1,
				loading:   false,
				hasMore:   json.hasMore,
			});

		});

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

		this.state.revisions.forEach( ( _revision, i ) => {
			if ( _revision.id === revision.id )  {
				currentIndex = i;
			}
		});

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
		var newRevisions = this.state.revisions.map( ( _revision ) => {
			_revision.active = revision && revision.id === _revision.id;
			return _revision;
		});

		var revision_b = this.getNextRevision( revision );

		this.setState({
			revisions: newRevisions,
			diff:      {
				a: revision.content,
				b: revision_b.content
			},
		});

		// Defer until actually set.
		this.toggleContainerClass();

	}

	onClearDiff() {

		this.setState({
			diff: { a: null, b: null },
		})

		this.toggleContainerClass();

	}

	toggleContainerClass() {

		if  ( null === this.state.diff.a || null === this.state.diff.b ) {
			this.props.containerEl.classList.remove( 'article-showing-diff' );
		} else {
			this.props.containerEl.classList.add( 'article-showing-diff' );
		}

	}

}


PageHistory.propTypes = {
	post_id: React.PropTypes.number.isRequired,
	revisions: React.PropTypes.array,
	containerEl: React.PropTypes.object, // DOM element.
};


PageHistory.defaultProps = {
	revisions: [],
};
