var defaultStrings = {
	listTitle: 'Page History',
	loadMore: 'Load more revisions',
};

var localizedStrings = ( 'window' in HMHandbookPageHistory ) ? window.HMHandbookPageHistory.strings : {};

export default {
	strings: Object.assign( defaultStrings, window.HMHandbookPageHistory.strings ),
	api_base: window.HMHandbookPageHistory.api_base,
	api_nonce: window.HMHandbookPageHistory.api_nonce,
}
