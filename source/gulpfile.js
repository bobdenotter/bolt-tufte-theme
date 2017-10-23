var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();

// Define base paths for Sass and Javascript.
var sassPaths = [
    'scss/',
];

var javascriptFiles = [
    'bower_components/jquery/dist/jquery.js',
];

// Set up 'sass' task.
gulp.task('sass', function() {
  return gulp.src('scss/tufte.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'nested' // 'compressed' or 'nested'
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('../css'));
});

// Set up 'compress' task.
gulp.task('compress', function() {
  return gulp.src('javascript/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('../javascript'));
});


gulp.task('copyjavascript', function() {
   gulp.src(javascriptFiles)
   .pipe(gulp.dest('javascript'));
});


// Set up 'default' task, with watches.
gulp.task('default', ['sass', 'compress'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['javascript/**/*.js'], ['compress']);
});
