import React from 'react';

/**
 * History List.
 */
export default class SearchBar_Result extends React.Component {

	render() {

		var classes = [ 'SearchBar_Result' ];
		classes.push( ( 'comment' === this.props.type ) ? 'SearchBar_Result-Comment' : 'SearchBar_Result-Post' );

		var style = { width: ( this.props.containerWidth - 60 ) + 'px' }

		return (
			<div style={ style } className={ classes.join( ' ' ) }>
				<a href={ this.props.url }>
					<h3 className="SearchBar_Result_Title">{ this.props.title }</h3>
					<div className="SearchBar_Result_Text">{ this.props.excerpt }</div>
				</a>
			</div>
		);
	}

}

SearchBar_Result.propTypes = {
	query:          React.PropTypes.string,
	containerWidth: React.PropTypes.number,
};

SearchBar_Result.defaultProps = {
	query:          '',
	containerWidth: 0,
}
