import React from 'react';
import PageHistoryListItem from './PageHistoryListItem.jsx';

/**
 * History List.
 */
export default class PageHistoryList extends React.Component {

	constructor( props ) {

	    super( props );

		this.state = {
			revisions: this.props.revisions,
		};

	}

	render() {

		const actions = {
			onSelectRevision: this.props.actions.onSelectRevision,
		};

		return (
			<div className="PageHistory_List_Container">
				<h4 className="PageHistory_List_Title">Page History</h4>
				<ul className="PageHistory_List">
					{ this.state.revisions.map( function( revision ) {

						if ( ! 'active' in revision ) {
							revision.active = false;
						}

						return (
							<PageHistoryListItem key={ revision.id } id={ revision.id } action={ revision.action } author={ revision.author } date={ revision.date } content={ revision.content } active={ revision.active } actions={ actions } />
						);
					}) }
				</ul>
			</div>
		);

	}

}
