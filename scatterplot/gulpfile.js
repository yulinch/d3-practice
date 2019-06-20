var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    // sassGlob = require('gulp-sass-glob'),
    filter  = require('gulp-filter'),
    // gulpImagemin = require('gulp-imagemin'),
    gulpPlumber = require('gulp-plumber'),
    gulpNotify = require("gulp-notify"),
    del = require('del');

gulp.task('clean', function(done) {
  del(['build']);
  done();
});

gulp.task('sass', function(){
	return gulp.src('sass/**/*.sass')
    .pipe(autoprefixer())
	// .pipe(sass().on('error', sass.logError))
	.pipe(sass({
		outputStyle: 'nested'
	}))
	.pipe(gulp.dest('css'))
	// .pipe(gulpNotify("Websites CSS Finish"));
	done();
});

gulp.task('watch', function(){
	return gulp.watch('sass/**/*.sass', gulp.series('sass'));
})