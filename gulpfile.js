var gulp = require('gulp'),
stylus = require('gulp-stylus'),
watch = require('gulp-watch'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
argv = require('yargs').argv,
del = require('del'),
nib = require('nib'),
jeet = require('jeet'),
rupture = require('rupture'),
origin

var source = {
	ROOT: '../../blossom',
	ORIGIN: '.',
}

argv.root == 1 ? origin = source.ROOT : origin = source.ORIGIN

console.log(origin)
gulp.task('purge', function (cb) {
	return del([
		origin + '/css/*',
		origin + '/js/*',
		'!' + origin + '/js/blossom.js',
		'!' + origin + '/css/font-awesome.css'
	], cb);
});

gulp.task('compile css', function () {
	return gulp.src('./styl/blossom.styl')
		.pipe(stylus({
			use: [jeet(), nib(), rupture()]
		}))
	 .pipe(gulp.dest(origin + '/css'));
});

gulp.task('minify css', function () {
	return gulp.src('./styl/blossom.styl')
		.pipe(stylus({
			compress: true,
			use: [jeet(), nib(), rupture()]
		}))
		.pipe(rename({
			basename: "blossom",
			suffix: ".min",
		}))
		.pipe(gulp.dest(origin + '/css'));
});

gulp.task('compile js', function () {
	return gulp.src('./js/blossom.js')
		.pipe(gulp.dest(origin + '/js'));
});

gulp.task('minify js', function () {
	return gulp.src('./js/blossom.js')
		.pipe(uglify())
		.pipe(rename({
			basename: "blossom",
			suffix: ".min",
		}))
		.pipe(gulp.dest(origin + '/js'));
});

gulp.task('build', ['purge', 'compile css', 'compile js', 'minify css', 'minify js']);
