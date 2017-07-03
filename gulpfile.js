const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const spawn = require('child_process').spawn;
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');

let node;

gulp.task('browserify', () => {
  browserify('app/assets/js/main.js')
    .bundle()
    .on('error', function (err) {
      gutil.log(gutil.colors.red('Browserify compilation error:'));
      gutil.log(err);
      this.emit('end');
    })
    .pipe(plumber())
    .pipe(source('main.js'))
    .pipe(streamify(babel({ presets: ['es2015'] }))) // babel doesn't support streaming
    .pipe(streamify(uglify())) // uglify doesn't support streaming
    .pipe(gulp.dest('dist/public/js'));
});

gulp.task('js-vendor', () => {
  gulp.src([
    'node_modules/govuk_frontend_toolkit/javascripts/govuk/selection-buttons.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/clipboard/dist/clipboard.min.js',
  ]).pipe(gulp.dest('dist/public/js'));
});

gulp.task('js', ['browserify', 'js-vendor']);

gulp.task('image-local', () =>
  gulp.src('app/assets/images/**')
    .pipe(gulp.dest('dist/public/images'))
);

gulp.task('image-vendor', () => {
  gulp.src([
    'node_modules/govuk-elements-sass/node_modules/govuk_frontend_toolkit/images/*.png',
  ])
    .pipe(gulp.dest('dist/public/images'));
});

gulp.task('images', ['image-local', 'image-vendor']);

gulp.task('css', () => {
  gulp.src('app/assets/stylesheets/*.scss')
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: [
          'src/assets/stylesheets',
          'node_modules/govuk_frontend_toolkit/stylesheets',
          'node_modules/govuk-elements-sass/public/sass',
        ],
      }))
    .pipe(gulp.dest('dist/public/stylesheets/'));
});


gulp.task('server', () => {
  if (node) node.kill();
  node = spawn('node', ['bin/www'], { stdio: 'inherit' });
  node.on('close', (code) => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('watch', ['js', 'css', 'images', 'server'], () => {
  gulp.watch(['app/**/*.js', 'bin/www'], ['server']);
  gulp.watch('app/assets/stylesheets/*.scss', ['css']);
  gulp.watch('app/assets/js/**/*.js', ['browserify']);
  gulp.watch('app/assets/images/**', ['image-local']);
});


// clean up if an error goes unhandled.
process.on('exit', () => {
  if (node) node.kill();
});

