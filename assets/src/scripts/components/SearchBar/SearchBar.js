import React, { Component } from 'react';
import SearchBarResults from './SearchBarResults.js';
import classNames from 'classnames';
import 'whatwg-fetch';
import searchBarSettings from './SearchBarSettings.js';

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
			'SearchBar':            true,
			'SearchBar-Focused':    this.state.focused,
			'SearchBar-HasResults': this.state.focused,
			'SearchBar-Loading':    this.state.loading,
		});

		return <div className={ searchBarClassNames }>

			<form
				className="SearchBar_Container"
				role="search"
				method="get"
				action="/"
				onSubmit={ (e) => { this.onSearch() } }
			>

				<label className="SearchBar_Label" htmlFor="site-search">{ searchBarSettings.strings.label }</label>

				<input
					ref="input"
					autoComplete="off"
					className="SearchBar_Field"
					name="s"
					type="search"
					id="site-search"
					placeholder={ searchBarSettings.strings.placeholder }
					value={ this.state.query }
					onChange={ () => this.onSearch() }
					onFocus={ () => this.onFocus() }
					onBlur={ () => this.onBlur() }
				/>

				<button className="SearchBar_Submit" type="submit">
					{ searchBarSettings.strings.button }
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

		let api_endpoint = searchBarSettings.api_endpoint;
		let api_nonce    = searchBarSettings.api_nonce;

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
