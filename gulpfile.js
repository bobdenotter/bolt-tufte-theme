var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var uglify = require('gulp-uglify');

var sassPaths = [
    'source/scss/',
    'bower_components/foundation-sites/scss',
    // 'bower_components/motion-ui/src',
    'bower_components/slicknav/scss',
    'bower_components/highlightjs/styles'
];


gulp.task('sass', function() {
  return gulp.src('source/scss/tufte.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'nested' // 'compressed' or 'nested'
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('compress', function() {
  return gulp.src('source/javascript/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('javascript'));
});


gulp.task('default', ['sass'], function() {
  gulp.watch(['source/scss/**/*.scss'], ['sass']);
});
