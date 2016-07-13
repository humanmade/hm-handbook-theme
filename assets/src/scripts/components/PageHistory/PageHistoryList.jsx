import React from 'react';
import PageHistoryListItem from './PageHistoryListItem.jsx';
import PageHistoryStrings from './PageHistoryStrings.jsx';

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
				<h4 className="PageHistory_List_Title">{ PageHistoryStrings.listTitle }</h4>
				<ul className="PageHistory_List">
					{ this.state.revisions.map( revision => {

						if ( ! 'active' in revision ) {
							revision.active = false;
						}

						return <PageHistoryListItem key={ revision.id } { ...revision } actions={ actions } />;

					} ) }
				</ul>
			</div>
		);

	}

}
