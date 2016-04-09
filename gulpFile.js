var gulp = require('gulp');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var open = require('gulp-open');
var os = require('os');

var SCRIPTS_PATH = 'public/js/**/*.js';
var HTML_PATH = 'public/**/*.html';
var VIEWS_HTML_PATH = 'public/views/**/*.html';
var CSS_PATH = 'public/css/**/*.css';
var IMG_SRC = 'public/img/src/**/*.*';
var IMG_COM_DEST = 'public/img/comp/';

/* CSS: styles gulp task */
gulp.task('styles', function() {
	return gulp.src(CSS_PATH)		
		.pipe(csslint())
		.pipe(csslint.reporter())		
		.pipe(livereload());
});

/* JS: scripts gulp task*/
gulp.task('scripts', function() {	
	return gulp.src(SCRIPTS_PATH)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(livereload());
});

/* IMG: images gulp task*/
gulp.task('images', function() {
	return gulp.src(IMG_SRC)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]
		}))
		.pipe(gulp.dest(IMG_COM_DEST))
		.pipe(livereload());
});

/*VIEWS: html gulp task*/
gulp.task('html', function() {
	return gulp.src(HTML_PATH)
		.pipe(livereload());
});

gulp.task('views', function() {
	return gulp.src(VIEWS_HTML_PATH)
		.pipe(livereload());
})

/*Gulp: Watch task*/
gulp.task('watch', function() {	
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
	gulp.watch(HTML_PATH, ['html']);
	gulp.watch(VIEWS_HTML_PATH, ['views']);
	gulp.watch(CSS_PATH, ['styles']);
	gulp.watch(IMG_SRC, ['images']);
});

/*Gulp: open in the default browser */
var browser = os.platform() === 'linux' ? 'google-chrome' : (
	os.platform() === 'darwin' ? 'google chrome': (
	os.platform() === 'win32' ? 'chrome' : 'firefox'));

gulp.task('open', function() {
	var options = {
		uri: 'http://localhost:3000',
		app: browser
	};

	gulp.src(__filename)
		.pipe(open(options));
});
/* Gulp default task*/
gulp.task('default', ['watch', 'open']);