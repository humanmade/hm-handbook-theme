module.exports =  {
	cache: false,
	devtool: 'source-map',
	entry: {
		theme: './assets/src/scripts/theme.js',
	},
	output: {
		path: 'assets/dist/scripts',
		filename: '[name].js',
		sourceMapFilename: '[file].map'
	},
	module: {
		loaders: []
	},
	plugins: [],
	externals: {
		'jquery' : 'jQuery'
	},
}
