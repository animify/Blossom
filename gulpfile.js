const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const watch = require('gulp-watch')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const runSequence = require('gulp-run-sequence')
const pump = require('pump')

const argv = require('yargs').argv
const appRoot = require('app-root-path')
const del = require('del')

const nib = require('nib')
const jeet = require('jeet')
const rupture = require('rupture')

const source = {
  ROOT: process.cwd() + '/../../blossom-ui',
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

gulp.task('watch source', function () {
  watch(['./source/**/*.styl', './source/blossom.styl'], () => { gulp.start('compile css') })
})

gulp.task('compile css', function () {
  return gulp.src('./source/blossom.styl')
    .pipe(stylus({
      use: [jeet(), nib(), rupture()]
    }))
   .pipe(gulp.dest(origin + '/css'))
})

gulp.task('minify css', function () {
  return gulp.src('./source/blossom.styl')
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

gulp.task('minify js', function (cb) {
  pump([
    gulp.src('./js/blossom.js'),
    babel({
      presets: ['es2015']
    }),
    uglify(),
    rename({
      basename: "blossom",
      suffix: ".min",
    }),
    gulp.dest(origin + '/js')
  ], cb)
})

gulp.task('copy gulp', function (cb) {
  if (origin = source.ROOT) {
    return gulp.src('./gulpfile.js')
      .pipe(gulp.dest(origin))
  }
  return false
})

gulp.task('copy fonts', function (cb) {
    return gulp.src('./source/fonts/*')
      .pipe(gulp.dest(origin + '/css/fonts'))
})

gulp.task('copy source', function (cb) {
  if (origin = source.ROOT) {
    return gulp.src(['./source/**/*', '!./source/**/_.styl'])
      .pipe(gulp.dest(origin + '/source'))
  }
  return false
})

gulp.task('check custom', function (cb) {
    const _path = path.join(origin, '/source/modules/_.styl')

    fs.stat(_path, function(err, stat) {
      if(err != null) {
        return gulp.src(['./source/modules/_.styl'])
          .pipe(gulp.dest(origin + '/source/modules'))
      }

      return false
    })

})

gulp.task('build', function(cb) {
  runSequence('purge', ['compile css', 'compile js'], ['minify css', 'minify js'], ['copy gulp', 'copy source'], 'copy fonts', 'check custom', cb)
})

gulp.task('watch', ['watch source'])
