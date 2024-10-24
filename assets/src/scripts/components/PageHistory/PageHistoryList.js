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

		loadMorebuttonClasses = [ 'btn btn--small btn-Link' ];
		loadMorebuttonClasses.push( this.props.loading ? 'btn-Loading' : null );

		return (
			<div>
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
						<span className={ this.props.loading ? 'Loading Loading-Active' : 'Loading' }></span>
						{ PageHistorySettings.strings.loadMore }
					</button>
				</div>

				<button
					className="btn btn--tertiary btn--small btn--print"
					onClick={ () => this.onPrint() }
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="size-5"
					>
						<path
							d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.752.097 1.126.153A2.212 2.212 0 0 1 18 8.653v4.097A2.25 2.25 0 0 1 15.75 15h-.241l.305 1.984A1.75 1.75 0 0 1 14.084 19H5.915a1.75 1.75 0 0 1-1.73-2.016L4.492 15H4.25A2.25 2.25 0 0 1 2 12.75V8.653c0-1.082.775-2.034 1.874-2.198.374-.056.75-.107 1.127-.153L5 6.25v-3.5Zm8.5 3.397a41.533 41.533 0 0 0-7 0V2.75a.25.25 0 0 1 .25-.25h6.5a.25.25 0 0 1 .25.25v3.397ZM6.608 12.5a.25.25 0 0 0-.247.212l-.693 4.5a.25.25 0 0 0 .247.288h8.17a.25.25 0 0 0 .246-.288l-.692-4.5a.25.25 0 0 0-.247-.212H6.608Z"
							clipRule="evenodd"
							fillRule="evenodd"
						/>
					</svg>

					Print document
				</button>
			</div>
		);
	}

	onPrint() {
		// Load.
		this.props.actions.onFetchRevisions().then( () => {
			// Expand.
			this.setState( { expanded: true } );

			// Print.
			window.print();
		} );
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
