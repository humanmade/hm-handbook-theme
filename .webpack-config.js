module.exports =  {
	cache: false,
	devtool: 'source-map',
	entry: {
		theme: './assets/src/scripts/theme.jsx',
	},
	output: {
		path: 'assets/dist/scripts',
		filename: '[name].js',
		sourceMapFilename: '[file].map'
	},
	module: {
		loaders: [
		    {
		    	test: /\.jsx?$/,
		    	exclude: /(node_modules|bower_components)/,
		    	loader: "babel-loader",
				query: {
					presets: [ 'react', 'es2015' ],
				}
		    }
		]
	},
	plugins: [],
	externals: {
		'jquery' : 'jQuery'
	},
}
