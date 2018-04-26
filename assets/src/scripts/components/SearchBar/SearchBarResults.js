import React, { Component } from 'react';
import SearchBarResult from './SearchBarResult.js';
import SearchBarSettings from './SearchBarSettings.js';

/**
 * History List.
 */
export default class SearchBarResults extends Component {

	render() {

		var height   = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var search   = document.getElementById( 'site-search' );
		var adminBar = document.getElementById( 'wpadminbar' );

		if ( search ) {
			height -= search.offsetHeight;
		}

		if ( adminBar ) {
			height -= adminBar.offsetHeight;
		}

		height -= 54;

		let displayNoResults = this.props.query.length > 1 && this.props.results.length < 1;

		return (
			<div className="search-bar__results" style={ { maxHeight: height }}>

				<h3
					className="search-bar__results__info"
					style={ { display: displayNoResults ? 'block' : 'none' } }>
					{ SearchBarSettings.strings.noResults }
				</h3>

				{ this.props.results.map( ( result, i ) => {
					return <SearchBarResult
						key={ i }
						{ ...result }
						containerWidth={ this.props.containerWidth }
					/>
				})}

			</div>
		);
	}

}

SearchBarResults.propTypes = {
	results:        React.PropTypes.array,
	containerWidth: React.PropTypes.number,
	query:          React.PropTypes.string,
};

SearchBarResults.defaultProps = {
	results:        [],
	containerWidth: 0,
	query:          '',
}
