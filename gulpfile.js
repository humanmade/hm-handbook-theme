const gulp         = require( 'gulp' );
const webpack      = require( 'webpack' );
const sourcemaps   = require( 'gulp-sourcemaps' );
const postcss      = require( 'gulp-postcss' );
const autoprefixer = require( 'autoprefixer' );
const sass         = require( 'gulp-sass' )( require( 'sass' ) );
const sassLint     = require( 'gulp-sass-lint' );
const Fiber        = require( 'fibers' );

// All the configs for different tasks.
const config = {
	sass: {
		outputStyle: 'compressed'
	},
	webpack: require( './webpack.config.js' ),
	imagemin: {
		progressive: true,
		svgoPlugins: [
			{ removeViewBox: false },
			{ cleanupIDs: false }
		],
	},
	postcss: [
		autoprefixer( { browsers: ['last 3 versions'] } ),
	],
	compiler: require('sass'),
	fiber: Fiber,
};

// Compile and minify CSS.
function styles() {
	return gulp.src('./assets/src/styles/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(config.sass).on('error', sass.logError))
		.pipe(postcss(config.postcss))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./assets/dist/styles'));
}

// Bundle JS.
function js( callback ) {
	// Set production environment to ensure webpack dev version isn't used.
	// Change to dev during developemnt to get more useful errors.
	config.webpack.plugins.push( new webpack.DefinePlugin({
		"process.env": {
			NODE_ENV: JSON.stringify( "production" ),
		}
	}));

	webpack(
		config.webpack,
		function( err, stats ) {
			if ( stats.compilation.errors.length > 0 ) {
				console.log(stats.compilation.errors.toString());
			}
			if ( stats.compilation.warnings.length > 0 ) {
				console.log(stats.compilation.warnings.toString() );
			}
			callback();
		}
	);
}

function lintSass() {
  return gulp.src( [ './assets/src/styles/**/*.s+(a|c)ss', '!./assets/src/styles/editor.scss', '!./assets/src/styles/login.scss' ] )
	.pipe( sassLint( { configFile: '.sass-lint.yml' } ) )
	.pipe( sassLint.format() )
	.pipe( sassLint.failOnError() )
}

// Watch for changes in JS/CSS.
function watch() {
	gulp.watch('assets/src/styles/**/*.scss', ['styles', 'lint-sass']);
	gulp.watch(['assets/src/scripts/**/*.js', 'assets/src/scripts/**/*.jsx'], ['js']);
}

module.exports = {
	styles,
	js,
	lintSass,
	watch,
	default: gulp.parallel(styles, js, lintSass),
}
