var strings      = ( 'HMHandbookSearchBarSettings' in window ) ? window.HMHandbookSearchBarSettings.strings       : {};
var api_nonce    = ( 'HMHandbookSearchBarSettings' in window ) ? window.HMHandbookSearchBarSettings.api_nonce     : '';
var api_endpoint = ( 'HMHandbookSearchBarSettings' in window ) ? window.HMHandbookSearchBarSettings.api_endpoint  : '';

var defaultStrings = {
	label:       'Search',
	button:      'Submit',
	placeholder: 'Search the site…',
	noResults:   'No results found',
};

export default {
	strings:      Object.assign( defaultStrings, strings ),
	api_endpoint: api_endpoint,
	api_nonce:    api_nonce,
}
