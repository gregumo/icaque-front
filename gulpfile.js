var gulp = require('gulp');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


// Install bower components on `/src` and `/web` folders
gulp.task('bower', function() {
  return $.bower()
    .pipe(gulp.dest('web/bower_components'))
});

// Optimize images
gulp.task('images', function () {
  return gulp.src('src/resources/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('web/resources/images'))
    .pipe($.size({title: 'images'}));
});

// Copy all files at the root level (app)
gulp.task('copy', function () {
  return gulp.src(config.copyFile, {
    dot: true
}).pipe(gulp.dest('web'))
    .pipe($.size({title: 'copy'}));
});

// Copy web fonts to dist
gulp.task('fonts', function () {
  return gulp.src(['src/resources/fonts/**/*'])
    .pipe(gulp.dest('web/resources/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src(config.sass.src)
    .pipe($.sourcemaps.init())
    .pipe($.changed('.tmp/styles', {extension: '.css'}))
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.csso()))
    .pipe(gulp.dest(config.sass.web))
    .pipe($.size({title: 'styles'}));
});

// Scan your HTML for assets & optimize them
gulp.task('html', function () {
  var assets = $.useref({searchPath: '{.tmp,web}'});

  return gulp.src('web/**/*.html')
    .pipe(assets)
    // Concatenate and minify JavaScript
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Concatenate and minify styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.csso()))
    // .pipe(assets.restore())
    .pipe($.useref())
    // Update production Style Guide paths
    // .pipe($.replace('components/components.css', 'components/main.min.css'))
    // Minify any HTML
    .pipe($.if('*.html', $.minifyHtml()))
    // Output files
    .pipe(gulp.dest('web'))
    .pipe($.size({title: 'html'}));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'web/*'], {dot: true}));

// Watch files for changes & reload
gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'Icaque',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'web']
  });

  gulp.watch(['src/**/*.html'], ['copy', reload]);
  gulp.watch(['src/resources/style/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['src/**/*.js'], reload);
  gulp.watch(['src/resources/images/**/*'], ['copy', reload]);
  gulp.watch(['src/resources/fonts/**/*'], ['copy', reload]);
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
  runSequence('bower', 'styles', ['html', 'images', 'fonts', 'copy'], cb);
});
