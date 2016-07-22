import React, { Component } from 'react';
import SearchBarResults from './SearchBarResults.js';

import 'whatwg-fetch';

var strings = {
	label:       'Search',
	button:      'Submit',
	placeholder: 'Search the site…',
};

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

		var searchBarClasses = [ 'SearchBar' ];

		if ( this.state.focused ) {
			searchBarClasses.push( 'SearchBar-Focused' );
			searchBarClasses.push( 'SearchBar-HasResults' );
		}

		if ( this.state.loading ) {
			searchBarClasses.push( 'SearchBar-Loading' );
		}

		return <div className={ searchBarClasses.join(' ') }>
			<form className="SearchBar_Container" role="search" method="get" onSubmit={ (e) => { e.preventDefualt(); this.onSearch() } }>
				<label className="SearchBar_Label" htmlFor="site-search">{ strings.label }</label>
				<input ref="input" className="SearchBar_Field" type="search" id="site-search" placeholder={ strings.placeholder } value={ this.state.query } onChange={ () => this.onSearch() } onFocus={ () => this.onFocus() } onBlur={ () => this.onBlur() } />
				<button className="SearchBar_Submit" type="submit">
					{ strings.button }
					<span className={ this.state.loading ? 'Loading Loading-Active' : 'Loading' }></span>
				</button>
			</form>
			<SearchBarResults results={ this.state.results } containerWidth={ this.props.containerEl.offsetWidth } />
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
		var api_endpoint = HMHandbookSearchSettings.api_endpoint;
		var api_nonce    = HMHandbookSearchSettings.api_nonce;

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
