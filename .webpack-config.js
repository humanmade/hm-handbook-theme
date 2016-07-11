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
		loaders: [
		    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	},
	plugins: [],
	externals: {
		'jquery' : 'jQuery'
	},
}
