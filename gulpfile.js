var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minfyCss = require('gulp-minify-css');
var react = require('gulp-react');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('default', ['react', 'css', 'ugl'], function() {
	return gulp.src('src/min/*.js')
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('dist/js'))
		.on('end', function () {
            del(['src/main.js', 'src/min']);
        });
});

gulp.task('react', function(){
	return gulp.src('src/main.jsx')
		.pipe(react())
		.pipe(gulp.dest('src/'))
		.pipe(uglify())
		.pipe(gulp.dest('src/min'));
});

gulp.task('ugl',function(){
	return gulp.src('src/page.js')
		.pipe(uglify())
		.pipe(gulp.dest('src/min'));
});

gulp.task('css',function(){
	return gulp.src('src/style.css')
		.pipe(minfyCss())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('watch',function(){
	gulp.watch(['src/*.jsx','src/*.css','src/*.js'], ['default']);
});
