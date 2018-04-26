import React, { Component } from 'react';
import classNames from 'classnames';

/**
 * History List.
 */
export default class SearchBarResult extends Component {

	render() {

		let classes = classNames({
			'search-bar__result':          true,
			'search-bar__result--comment': 'comment' === this.props.type,
			'search-bar__result--post':    'post' === this.props.type
		});

		let style = {}

		return (
			<div style={ style } className={ classes }>
				<a href={ this.props.url }>
					<h3 className="search-bar__result__title">{ this.props.title }</h3>
					<div className="search-bar__result__text">{ this.props.excerpt }</div>
				</a>
			</div>
		);
	}

}

SearchBarResult.propTypes = {
	query:          React.PropTypes.string,
	containerWidth: React.PropTypes.number,
};

SearchBarResult.defaultProps = {
	query:          '',
	containerWidth: 0,
}
