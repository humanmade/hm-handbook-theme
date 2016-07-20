var strings   = ( 'HMHandbookPageHistory' in window ) ? window.HMHandbookPageHistory.strings   : {};
var api_nonce = ( 'HMHandbookPageHistory' in window ) ? window.HMHandbookPageHistory.api_nonce : '';
var api_base  = ( 'HMHandbookPageHistory' in window ) ? window.HMHandbookPageHistory.api_base  : '';

var defaultStrings = {
	listTitle: 'Page History',
	loadMore: 'Load more revisions',
};

export default {
	strings: Object.assign( defaultStrings, strings ),
	api_base: api_base,
	api_nonce: api_nonce,
}
