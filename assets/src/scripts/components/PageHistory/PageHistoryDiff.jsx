import React from 'react';
import DiffMatchPatch from 'diff-match-patch';

/**
 * Diff component.
 */
export default class PageHistoryDiff extends React.Component {

	render() {
		return ( <div className="PageHistory_Diff" dangerouslySetInnerHTML={ { __html: this.getDiffHTML() } } /> );
	}

	getDiffHTML() {

		if ( ! ( this.props.diff_a && this.props.diff_b ) ) {
			return '';
		}

		var html = [];
		var dmp  = new DiffMatchPatch();

		var diff = dmp.diff_main(
			this.props.diff_b.content.replace( /[\n|\r]{2,}/g, "\n\n" ),
			this.props.diff_a.content.replace( /[\n|\r]{2,}/g, "\n\n" )
		);

		dmp.diff_cleanupSemantic( diff );

		diff.forEach( function( part, i ) {

			var text = this.escapeHtml( part[1] );

			if ( 1 === part[0] ) {
				html[i] = '<ins class="PageHistory_Diff-Added">' + text + '</ins>';
			} else if ( -1 === part[0] ) {
				html[i] = '<del class="PageHistory_Diff-Removed">' + text + '</del>';
			} else {
				html[i] = '<span>' + text + '</span>';
			}

		}.bind( this ) );

		return html.join( '' );

	}

	escapeHtml( text ) {

		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;',
			"/\r|\n": '&para;',
		};

		return text.replace( /[&<>"']/g, function( m ) { return map[ m ]; } );

	}

};

PageHistoryDiff.defaultProps = {
	diff_a: null,
	diff_b: null,
}
