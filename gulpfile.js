var gulp = require('gulp');
var config = require('./gulp.config')();
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var sass = require('gulp-sass');
var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('web/bower_components'))
});

gulp.task('copy', function() {
  gulp.src(config.copyFile)
    .pipe(gulp.dest('web'));
});

gulp.task('watch', function () {
    gulp.watch(config.copyFile, ['copy']);
});
