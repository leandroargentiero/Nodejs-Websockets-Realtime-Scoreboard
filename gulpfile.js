var gulp = require('gulp'),
	concatCSS = require('gulp-concat-css'),
	minifyCSS = require('gulp-minify-css'),
	sass = require('gulp-sass');

gulp.task('sass', function(){
	return gulp.src('./sass/*.scss')
	.pipe(sass())
	.pipe(minifyCSS())
	.pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function(){
	gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);