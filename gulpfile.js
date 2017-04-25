const gulp = require('gulp')
const stylus = require('gulp-stylus')
const watch = require('gulp-watch')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const argv = require('yargs').argv
const appRoot = require('app-root-path')
const del = require('del')
const nib = require('nib')
const jeet = require('jeet')
const rupture = require('rupture')

let source = {
	ROOT: appRoot + '/blossom',
	ORIGIN: '.'
}

let origin = source.ORIGIN
argv.root == 1 ? origin = source.ROOT : origin = source.ORIGIN

gulp.task('purge', function (cb) {
	return del([
		origin + '/css/blossom.min.css',
		origin + '/js/blossom.min.js'
	], {force: true}, cb)
})

gulp.task('compile css', function () {
	return gulp.src('./styl/blossom.styl')
		.pipe(stylus({
			use: [jeet(), nib(), rupture()]
		}))
	 .pipe(gulp.dest(origin + '/css'))
})

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
		.pipe(gulp.dest(origin + '/css'))
})

gulp.task('compile js', function () {
	return gulp.src('./js/blossom.js')
		.pipe(gulp.dest(origin + '/js'))
})

gulp.task('minify js', function () {
	return gulp.src('./js/blossom.js')
		.pipe(uglify())
		.pipe(rename({
			basename: "blossom",
			suffix: ".min",
		}))
		.pipe(gulp.dest(origin + '/js'))
})

gulp.task('build', ['purge', 'compile css', 'compile js', 'minify css', 'minify js'])
