const gulp = require('gulp');

const connect = require('gulp-connect');

const useref = require('gulp-useref');
const gulpif = require('gulp-if');

const minify = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

const inlinecss = require('gulp-inline-css');
const inlinesource = require('gulp-inline-source');

gulp.task('connect', function() {
  connect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src('src/css/*.css')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['src/*.html'], ['html']);
  gulp.watch(['src/css/*.css'], ['css']);
});

gulp.task('build', function() {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpif('*.css', minify()))
    .pipe(gulpif('*.html', inlinesource()))
    .pipe(gulpif('*.html', inlinecss({
      removeStyleTags: false
    })))
    .pipe(gulpif('*.html', htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['connect', 'watch']);
