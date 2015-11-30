var gulp = require('gulp');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')();

gulp.task('watch', function () {
    gulp.watch(config.copyFile, ['copy']);
    gulp.watch(config.sass.watch, ['sass']);
});

gulp.task('bower', function() {
  return $.bower()
    .pipe(gulp.dest('web/bower_components'))
});

gulp.task('copy', function() {
    gulp.src(config.copyFile)
        .pipe(gulp.dest('web'));
});

gulp.task('sass', function() {
  gulp.src(config.sass.src)
    .pipe($.sass())
    .pipe(gulp.dest(config.sass.web));
});
