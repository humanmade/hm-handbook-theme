import React, { Component } from 'react';
import SearchBarResults from './SearchBarResults.js';
import classNames from 'classnames';
import 'whatwg-fetch';
import SearchBarSettings from './SearchBarSettings.js';

export default class SearchBar extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			query: this.props.query,
			results: [],
			focused: false,
			loading: false,
		};
	}

	render() {

		let searchBarClassNames = classNames({
			'search-bar':              true,
			'search-bar--focused':     this.state.focused,
			'search-bar--has-results': this.state.results.length,
			'search-bar--loading':     this.state.loading,
		});

		return <div className={ searchBarClassNames }>

			<form
				className="search-bar__container"
				role="search"
				method="get"
				action="/"
				onSubmit={ (e) => { this.onSearch() } }
			>

				<label className="search-bar__label" htmlFor="site-search">{ SearchBarSettings.strings.label }</label>

				<input
					ref="input"
					autoComplete="off"
					className="search-bar__field"
					name="s"
					type="search"
					id="site-search"
					placeholder={ SearchBarSettings.strings.placeholder }
					value={ this.state.query }
					onChange={ () => this.onSearch() }
					onFocus={ () => this.onFocus() }
					onBlur={ () => this.onBlur() }
				/>

				<button className="search-bar__submit" type="submit">
					{ SearchBarSettings.strings.button }
					<span className={ this.state.loading ? 'Loading Loading-Active' : 'Loading' }></span>
				</button>

			</form>

			<SearchBarResults
				results={ this.state.results }
				containerWidth={ this.props.containerEl.offsetWidth }
				query={ this.state.query }
			/>

		</div>
	}

	onSearch( e ) {

		var query = this.refs.input.value;

		if ( query.length < 2 ) {
			this.setState( { query: query, results: [], loading: false } )
			return;
		}

		this.setState( { query: query, loading: true } );
		this.fetchResults( query )
	}

	fetchResults( query ) {
		let api_endpoint = SearchBarSettings.api_endpoint;
		let api_nonce    = SearchBarSettings.api_nonce;

		api_endpoint += `?query=${ encodeURIComponent( query ) }`;

		fetch( api_endpoint, {
			credentials: 'include',
			headers: new Headers({
				'X-WP-Nonce': api_nonce
			}),
		} ).then( ( response ) => {
			if ( response.ok ) {
				return response.json();
			}
		}).then( ( json ) => {
			this.setState( { results: json.results } );

			// Delay disable loading just a little.
			window.setTimeout( () => {
				this.setState( { loading: false } );
			}, 500 );

		});
	}

	onFocus() {
		this.setState( { focused: true } );
	}

	onBlur() {
		window.setTimeout( () => {
			this.setState( { focused: false } );
		}, 500 );
	}

}

SearchBar.propTypes = {
	query:       React.PropTypes.string,
	containerEl: React.PropTypes.object, // DOM element.
};

SearchBar.defaultProps = {
	containerEl: null,
};
