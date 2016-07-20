import React from 'react';

export default class PageHistoryListItem extends React.Component {

	render() {

		var verb       = 'create' === this.props.action ? 'created' : 'updated';
		var classNames = [ 'PageHistory_List_Item' ];

		if ( this.props.active ) {
			classNames.push( 'PageHistory_List_Item-Active' );
		}

		return (
			<li className={ classNames.join( ' ' ) }>
				<a href={ '#revision-' + this.props.id } onClick={ e => { e.preventDefault(); this.props.actions.onSelectRevision( this.props ) } }>
					{ this.props.date } &ndash; { this.props.author }
				</a>
			</li>
		);
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
