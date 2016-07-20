var os = require('os');
var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
var open = require('gulp-open');
var imageop = require('gulp-image-optimization');
var clean = require('gulp-clean');


gulp.task('hello', function(){
    console.log('hello nagaraju');
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});


gulp.task('images', function(cb) {
    gulp.src(['app/img/**/*.+(png|jpg|jpeg|gif|svg)']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('dist/img')).on('end', cb).on('error', cb);
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});


gulp.task('open', function(){
  gulp.src('./dist/index.html')
  .pipe(open());
});

gulp.task('clean', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

gulp.task('build', function (callback) {
  runSequence(
    ['useref', 'images', 'fonts', 'open'],
    callback
  )
});

