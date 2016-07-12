import React from 'react';

export default class PageHistoryListItem extends React.Component {

	render() {

		var verb       = 'create' === this.props.action ? 'created' : 'updated';
		var classNames = [ 'PageHistory_List_Item' ];

		if ( this.props.active ) {
			classNames.push( 'PageHistory_List_Item-Active' );
		}

		return (
			// <li className={ classNames.join( ' ' ) } onClick={ e => this.props.actions.onSelectRevision( this.props ) }>
			<li className={ classNames.join( ' ' ) } onClick={ e => this.onSelectRevision() }>
				{ this.props.author } { verb } { this.props.date }
			</li>
		);
	}

	onSelectRevision() {
		this.props.actions.onSelectRevision( this.props );
	}

}

PageHistoryListItem.defaultProps = {
	id:      0,
	active:  false,
	author:  '',
	action:  'update',
	date:    '',
	content: '',
};
