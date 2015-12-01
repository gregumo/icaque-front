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
    .pipe(gulp.dest(config.bower.dest))
});

// Optimize images
gulp.task('images', function () {
  return gulp.src(config.images.src)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(config.images.dest))
    .pipe($.size({title: 'images'}));
});

// Copy all files at the root level (app)
gulp.task('copy', function () {
  return gulp.src(config.copy.src, {
    dot: true
}).pipe(gulp.dest(config.root.dest))
    .pipe($.size({title: 'copy'}));
});

// Copy web fonts to dist
gulp.task('fonts', function () {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest))
    .pipe($.size({title: 'fonts'}));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src(config.sass.src)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.sass.dest))
    .pipe($.size({title: 'styles'}));
});

// Scan your HTML for assets & optimize them
gulp.task('html', function () {
  var assets = $.useref({searchPath: '{.tmp,web}'});

  return gulp.src(config.html.src)
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
    .pipe(gulp.dest(config.root.dest))
    .pipe($.size({title: 'html'}));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', config.root.dest], {dot: true}));

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
    server: ['.tmp', config.root.dest]
  });

  gulp.watch(config.html.watch, ['copy', reload]);
  gulp.watch(config.sass.watch, ['styles', reload]);
  gulp.watch(config.js.watch, ['copy', reload]);
  gulp.watch(config.images.watch, ['copy', reload]);
  gulp.watch(config.fonts.watch, ['copy', reload]);
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
  runSequence('bower', 'styles', ['html', 'images', 'fonts', 'copy'], cb);
});
