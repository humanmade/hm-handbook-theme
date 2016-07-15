var defaultStrings = {
	listTitle: 'Page History',
	loadMore: 'Load more revisions',
};

export default {
	strings: Object.assign( defaultStrings, window.HMHandbookPageHistory.strings ),
	api_base: window.HMHandbookPageHistory.api_base,
	api_nonce: window.HMHandbookPageHistory.api_nonce,
}
