import React, { Component } from 'react';
import SearchBarResult from './SearchBarResult.js';

/**
 * History List.
 */
export default class SearchBarResults extends Component {

	render() {

		// Get the height of the whole document.
		// Bit convoluted, taken from jQuery.
		var height = Math.max(
			document.body.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.clientHeight,
			document.documentElement.scrollHeight,
			document.documentElement.offsetHeight
		);

		var adminBar = document.getElementById( 'wpadminbar' );

		if ( adminBar ) {
			height = height - adminBar.offsetHeight;
		}

		return (
			<div className="SearchBar_Results" style={ { maxHeight: ( height - 108 ) + 'px' } }>

				<h3
					className="SearchBar_Results-Info"
					style={ { display: this.props.results.length > 0 ? 'none' : 'block' } }>
					No results found
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
};

SearchBarResults.defaultProps = {
	results:        [],
	containerWidth: 0,
}
