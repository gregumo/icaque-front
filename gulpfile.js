var gulp = require('gulp');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')();

gulp.task('bower', function() {
  return $.bower()
    .pipe(gulp.dest('web/bower_components'))
});

gulp.task('copy', function() {
  gulp.src(config.copyFile)
    .pipe(gulp.dest('web'));
});

gulp.task('watch', function () {
    gulp.watch(config.copyFile, ['copy']);
});
