import React, { Component } from 'react';
import classNames from 'classnames';

/**
 * History List.
 */
export default class SearchBar_Result extends Component {

	render() {

		let classes = classNames({
			'SearchBar_Result':         true,
			'SearchBar_Result-Comment': 'comment' === this.props.type,
			'SearchBar_Result-Post':    'post' === this.props.type
		});

		let style = { width: ( this.props.containerWidth - 60 ) + 'px' }

		return (
			<div style={ style } className={ classes }>
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
