const webpack = require( 'webpack' );

module.exports =  {
	cache: false,
	devtool: 'source-map',
	entry: {
		theme: [
			'./vendor/hm-pattern-library/assets/js/juniper.js',
			'./assets/src/scripts/theme.js',
		]
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
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			sourceMap: true,
		}),
	],
	externals: {
		'jquery' : 'jQuery'
	},
}
