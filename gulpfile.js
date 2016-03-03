var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('scripts', function() {
  return gulp.src(['app/assets/**/*.js'])
  	.pipe(sourcemaps.init())    
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_build/assets/js/'));
});

gulp.task('compress', function() {
  return gulp.src('_build/assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task('rebuild', function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        server: {
            baseDir: '_build'
        }
    });
});

gulp.task('copy', function(){
  return gulp.src('app/*.html')
  .pipe(gulp.dest('_build'));
})

gulp.task('sass', function () {
  gulp.src('app/assets/sass/**/*.sass')
  	.pipe(sourcemaps.init())
    .pipe(sass({
    	outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sourcemaps.write('/')) 
    .pipe(gulp.dest('_build/assets/css'))
    .pipe(browserSync.reload({stream:true}))
   //.pipe(gulp.dest('app/assets/css'))
});

gulp.task('watch', function() {
  gulp.watch(['app/assets/sass/*.sass','app/assets/sass/**/*.sass'], ['sass']); 
  gulp.watch(['app/assets/js/*.js'], ['scripts','compress']);
  gulp.watch(['app/*.html'], ['copy']);
  gulp.watch(['_build/*.html'], ['rebuild']);
});

gulp.task('default', ['copy','scripts', 'watch', 'browser-sync' ]);  