import React from 'react';
import PageHistoryListItem from './PageHistoryListItem.js';
import PageHistorySettings from './PageHistorySettings.js';

/**
 * History List.
 */
export default class PageHistoryList extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			expanded:  false,
		};
	}

	render() {

		var actions, containerClasses, toggleButtonClasses, loadMorebuttonClasses, toggleExpandedState;

		actions = {
			onSelectRevision: this.props.actions.onSelectRevision,
			onfetchRevisions: this.props.actions.onFetchRevisions,
		};

		containerClasses = [ 'PageHistory_List_Container' ];
		containerClasses.push( this.state.expanded ? 'PageHistory_List_Container-Expanded' : 'PageHistory_List_Container-Collapsed' );

		toggleButtonClasses = [ 'btn btn--small btn--toggle' ];
		toggleButtonClasses.push( this.state.expanded ? ' btn--state-expanded' : null );

		loadMorebuttonClasses = [ 'btn btn--small btn--tertiary' ];
		loadMorebuttonClasses.push( this.props.loading ? 'btn-Loading' : null );

		return (
			<div ref="list" className={ containerClasses.join( ' ' ) }>

				<button onClick={ () => { this.onToggleExpanded() } } className={ toggleButtonClasses.join( ' ' ) }>&#9660;</button>

				<h4 className="PageHistory_List_Title">{ PageHistorySettings.strings.listTitle }</h4>
				<ul className="PageHistory_List">
					{ this.props.revisions.map( revision => {

						if ( ! 'active' in revision ) {
							revision.active = false;
						}

						return <PageHistoryListItem key={ revision.id } { ...revision } actions={ actions } />;

					})}
				</ul>
				<button onClick={ () => actions.onfetchRevisions() } className={ loadMorebuttonClasses.join( ' ' ) } disabled={ ! this.props.hasMore }>
					{ this.props.loading && <span className="loading loading--active"></span> }
					{ PageHistorySettings.strings.loadMore }
				</button>
			</div>
		);
	}

	onToggleExpanded() {

		var newState = ! this.state.expanded;

		this.setState( {
			expanded: newState
		} );

		// Load revisions if have more and there are none.
		// Used on first expansion of component.
		if ( this.props.revisions.length < 1 && this.props.hasMore ) {
			this.props.actions.onFetchRevisions();
		}

		if ( ! newState ) {
			this.props.actions.onClearDiff();
		}
	}
}

PageHistoryList.propTypes = {
	revisions: React.PropTypes.array,
	loading:   React.PropTypes.bool,
	hasMore:   React.PropTypes.bool,
};

PageHistoryList.defaultProps = {
	revisions: [],
	loading:   false,
	hasMore:   true,
}
