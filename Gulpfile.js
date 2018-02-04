'use strict';

const STYLES_PATH = './app/styles/';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

/**
 * Task for compiling sass to minified css
 */
gulp.task('sass', () => {
  return gulp
    .src(`${STYLES_PATH}sass/*.sass`)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(`${STYLES_PATH}css`))
    .pipe(browserSync.stream())
});

/**
 * Task for dev mode, to help to reload changes dynamicaly in the browser
 */
gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './app'
  });

  gulp.watch(`${STYLES_PATH}sass/*.sass`, ['sass']);
  gulp.watch(`app/*.html`)
    .on('change', browserSync.reload);
});

/**
 * Task for build to production
 */
gulp.task('build', ['sass'])