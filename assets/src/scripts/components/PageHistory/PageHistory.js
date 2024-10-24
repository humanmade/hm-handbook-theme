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
			onFetchRevisions: () => this.onfetchRevisions(),
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

		var url = PageHistorySettings.api_base + 'revisions/' + this.props.post_id + '/?paged=' + this.state.page;

		var request = new Request( url, {
			credentials: 'include',
			headers: new Headers({
				'X-WP-Nonce': PageHistorySettings.api_nonce
			})
		});

		return fetch( request ).then( response => {
			if ( response.ok ) {
				return response.json();
			}
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

		// Update active state for each revision.
		var newRevisions = this.state.revisions.map( ( _revision ) => {
			_revision.active = false
			return _revision;
		});

		this.setState({
			revisions: newRevisions,
			diff: { a: null, b: null },
		});

		this.toggleContainerClass();
	}

	toggleContainerClass() {
		window.setTimeout( () => {
			if  ( null === this.state.diff.a || null === this.state.diff.b ) {
				this.props.containerEl.classList.remove( 'article-showing-diff' );
			} else {
				this.props.containerEl.classList.add( 'article-showing-diff' );
			}
		} );
	}
}

PageHistory.propTypes = {
	post_id: React.PropTypes.number.isRequired,
	post_type: React.PropTypes.string,
	revisions: React.PropTypes.array,
	containerEl: React.PropTypes.object, // DOM element.
};

PageHistory.defaultProps = {
	revisions: [],
	post_type: 'post',
};
