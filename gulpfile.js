var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    scss = require('gulp-sass'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    reload = browserSync.reload;

var path = {
  build: {
    html: 'build/',
    css: 'build/css',
    js: 'build/js',
    img: 'build/img',
    fonts: 'build/fonts'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

gulp.task('html:build', function() {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true}));
});

gulp.task('js:build', function() {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('scss:build', function() {
  return gulp.src(path.src.style)
    .pipe(plumber({
      errorHandler: notify.onError( function(err) {
        return {
          title: 'styles error',
          message: err.message
        }
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.scss'))
    .pipe(scss({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(cleanCSS(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream:true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function() {
  gulp.src(path.src.img)
    .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
    ]))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('build', [
  'html:build',
  'js:build',
  'scss:build',
  'fonts:build',
  'image:build'
]);

gulp.task('watch', function() {
  gulp.watch(path.watch.html, ['html:build']);
  gulp.watch(path.watch.js, ['js:build']);
  gulp.watch(path.watch.style, ['scss:build']);
  gulp.watch(path.watch.fonts, ['fonts:build']);
  gulp.watch(path.watch.img, ['image:build']);  
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
});
  
gulp.task('clean', function() {
  return del(path.clean);
});

gulp.task('default', ['build', 'server', 'watch']);





