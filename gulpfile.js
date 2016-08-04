var gulp = require('gulp'),
	concatCSS = require('gulp-concat-css'),
	minifyCSS = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	imageMIN = require('gulp-imagemin');
	

gulp.task('sass', function(){
	return gulp.src('./sass/*.scss')
	.pipe(sass())
	.pipe(minifyCSS())
	.pipe(gulp.dest('./build/css'));
});

gulp.task('imageMIN', function(){
	return gulp.src('./images/*')
	.pipe(imageMIN())
	.pipe(gulp.dest('./build/img'));
});

gulp.task('watch', function(){
	gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'imageMIN','watch']);