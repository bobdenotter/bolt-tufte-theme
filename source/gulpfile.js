var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var argv = require('yargs').argv;

// Check for --production flag
var PRODUCTION = !!(argv.production);

// Define base paths for Sass and Javascript.
var sassPaths = [
    'scss/',
];

var javascriptFiles = [
  'javascript/tufte.js',
  'node_modules/jquery/dist/jquery.js',
  // 'node_modules/baguettebox.js/src/baguetteBox.js',
  'node_modules/prismjs/prism.js',
  'node_modules/prismjs/components/prism-apacheconf.js',
  'node_modules/prismjs/components/prism-bash.js',
  'node_modules/prismjs/components/prism-css.js',
  'node_modules/prismjs/components/prism-json.js',
  'node_modules/prismjs/components/prism-markdown.js',
  'node_modules/prismjs/components/prism-php.js',
  'node_modules/prismjs/components/prism-python.js',
  'node_modules/prismjs/components/prism-sass.js',
  'node_modules/prismjs/components/prism-twig.js',
  'node_modules/prismjs/components/prism-yaml.js',
  'node_modules/prismjs/components/prism-markup-templating.js',
  'node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js',
  'node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js',
  'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
];



// Set up 'sass' task.
gulp.task('sass', function() {

  return gulp.src('scss/tufte.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('../css'));
});

// Set up 'compress' task.
gulp.task('compress', function() {
  return gulp.src(javascriptFiles)
    .pipe($.if(PRODUCTION, $.uglify()))
    .pipe($.concat('tufte.js'))
    .pipe(gulp.dest('../javascript'));
});

gulp.task('copyjavascript', function() {
   gulp.src(javascriptFiles)
   .pipe(gulp.dest('javascript'));
});

gulp.task('setproduction', function() {
  PRODUCTION = true;
});

// Set up 'default' task, with watches.
gulp.task('default', ['sass', 'compress'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['javascript/**/*.js'], ['compress']);
});

// Set up 'build' task, without watches and force 'production'.
gulp.task('build', ['setproduction','sass', 'compress']);