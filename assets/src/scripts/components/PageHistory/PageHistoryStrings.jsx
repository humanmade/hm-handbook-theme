var defaultStrings = {
	listTitle: 'Page History',
};

var localizedStrings = ( 'window' in HMHandbookPageHistory ) ? window.HMHandbookPageHistory.strings : {};

export default Object.assign( defaultStrings, window.HMHandbookPageHistory.strings );
