/**
 * Credit to https://github.com/ridgehkr/ for the general style and design.
 */

var paths = {
	src: {
		scripts: [
			/*
			'bower_components/modernizr/modernizr.js',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/fastclick/lib/fastclick.js',
			'bower_components/jquery.cookie/jquery.cookie.js',
			'bower_components/jquery-placeholder/jquery.placeholder.js',
			'bower_components/foundation/js/foundation.min.js', 
			*/
			'src/scripts/**/*.js'
		],
		styles: [
			'src/styles/**/*.{css,scss}'
		],
		fonts: [ 
			'src/fonts/**/*', 
			'src/bower_components/font-awesome/fonts/*.{eot,svg,ttf,woff,otf}' 
		]
	},
	dest: {
		scripts: '../scripts',
		styles: '../styles',
		fonts: '../fonts'
	}
};

// Port to listen on.
var listenPort = process.env.PORT || 1337;

// Load plugins
var gulp = require('gulp'),
	gulpSass = require('gulp-ruby-sass'),
	gulpAutoprefixer = require('gulp-autoprefixer'),
	gulpUglify = require('gulp-uglify'),
	gulpClean = require('gulp-clean'),
	gulpConcat = require('gulp-concat');

gulp.task('styles', function() {
	return gulp.src( paths.src.styles )
		.pipe(gulpSass({ style: 'compressed' }))
		.pipe(gulpAutoprefixer('last 2 version', '> 5%', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest( paths.dest.styles ))
		.pipe(gulpLiveReload( liveReload ));
});

gulp.task('fonts', function() {
	return gulp.src( paths.src.fonts )
		.pipe(gulp.dest( paths.dest.fonts ));
});

gulp.task('scripts', function() {
	return gulp.src( paths.src.scripts )
		.pipe(gulpUglify())
		.pipe(gulpConcat('flh.js'))
		.pipe(gulp.dest( paths.dest.scripts ))
		.pipe(gulpLiveReload( liveReload ));
});

gulp.task('clean', function() {
	return gulp.src([ 
			paths.dest.styles, 
			paths.dest.fonts, 
			paths.dest.scripts, 
			paths.dest.images,
			paths.dest.templates+'/**/*html'
		], {read: false})
		.pipe(gulpClean());
});

gulp.task('clean-styles', function() {
	return gulp.src([ paths.dest.styles ], {read: false})
		.pipe(gulpClean());
});

gulp.task('clean-scripts', function() {
	return gulp.src([ paths.dest.scripts ], {read: false})
		.pipe(gulpClean());
});

gulp.task('clean-fonts', function() {
	return gulp.src([ paths.dest.fonts ], {read: false})
		.pipe(gulpClean());
});

gulp.task('default', ['clean'], function() {
	gulp.start( 'styles', 'fonts', 'scripts' );
});

gulp.task('watch', function() {
	gulp.start( 'styles', 'fonts', 'scripts' );
	gulp.watch( paths.src.styles , ['clean-styles', 'styles'] );
	gulp.watch( paths.src.fonts , ['clean-fonts', 'fonts'] );
	gulp.watch( paths.src.scripts , ['clean-scripts', 'scripts'] );
});