import React from 'react';
import DiffMatchPatch from 'diff-match-patch';

/**
 * Diff component.
 */
export default class PageHistoryDiff extends React.Component {

	render() {
		return (
			<div className="PageHistory_Diff">
				{ this.getDiff().map( ( part, i ) => {
					if ( 1 === part[0] ) {
						return <ins key={ i } className="PageHistory_Diff-Added">{ part[1] }</ins>
					} else if ( -1 === part[0] ) {
						return <del key={ i } className="PageHistory_Diff-Removed">{ part[1] }</del>
					} else {
						return <span key={ i } className="PageHistory_Diff-NoChange">{ part[1] }</span>
					}
				} ) }
			</div>
		);
	}

	getDiff() {

		if ( ! ( this.props.diff_a && this.props.diff_b ) ) {
			return [];
		}

		var dmp  = new DiffMatchPatch();

		var diff = dmp.diff_main(
			this.props.diff_b.replace( /[\n|\r]{2,}/g, "\n\n" ),
			this.props.diff_a.replace( /[\n|\r]{2,}/g, "\n\n" )
		);

		dmp.diff_cleanupSemantic( diff );

		return diff;

	}

};

PageHistoryDiff.propTypes = {
    diff_a: React.PropTypes.string,
    diff_b: React.PropTypes.string,
};

PageHistoryDiff.defaultProps = {
	diff_a: '',
	diff_b: '',
}
