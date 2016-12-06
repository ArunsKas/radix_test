// Include gulp.
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var config = require('./config.json');

// Include plugins.
var $ = require('gulp-load-plugins')();
var del = require('del');
// gulp-load-plugins will report "undefined" error unless you load gulp-sass manually.
var sass = require('gulp-sass');
var kss = require('kss');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var shell = require('gulp-shell');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefix = require('gulp-autoprefixer');
var glob = require('gulp-sass-glob');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var scssLint = require('gulp-scss-lint');
var jshint = require('gulp-jshint');

// CSS.
gulp.task('css', function() {
  return gulp.src(config.css.src)
    .pipe(glob())
    .pipe(plumber({
      errorHandler: function (error) {
        notify.onError({
          title:    "Gulp",
          subtitle: "Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
        }) (error);
        this.emit('end');
      }}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      style: 'compressed',
      errLogToConsole: true,
      includePaths: config.css.includePaths
    }))
    .pipe(autoprefix('last 2 versions', '> 1%', 'ie 9', 'ie 10'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.css.dest))
    .pipe(browserSync.reload({ stream: true, match: '**/*.css' }));
});

// Compress images.
gulp.task('images', function () {
  return gulp.src(config.images.src)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest(config.images.dest));
});

// Fonts.
gulp.task('fonts', function() {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest));
});

// Watch task.
gulp.task('watch', function() {
  gulp.watch(config.css.src, ['css']);
  gulp.watch(config.images.src, ['images']);
});

// Static Server + Watch
gulp.task('serve', ['css', 'fonts', 'styleguide', 'watch'], function() {
  browserSync.init({
    proxy: config.browserSyncProxy
  });
});

// Build style guide.
gulp.task('styleguide', ['clean:styleguide']);
gulp.task('styleguide', function() {
  return kss(config.styleGuide);
});

// Clean style guide files.
gulp.task('clean:styleguide', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del([
      config.styleGuide.destination + '*.html',
      config.styleGuide.destination + 'public'
    ], {force: true});
});

// Run drush to clear the theme registry.
gulp.task('drush', shell.task([
  'drush cache-clear theme-registry'
]));

// SCSS Linting.
gulp.task('scss-lint', function() {
  return gulp.src([config.css.src])
    .pipe(scssLint())
    .pipe(scssLint.format())
    .pipe(scssLint.failOnError());
});

// JS Linting.
gulp.task('js-lint', function() {
  return gulp.src(config.js.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Default Task
gulp.task('default', ['serve']);
