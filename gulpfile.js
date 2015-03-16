var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts','jasmine']);
	gulp.watch('spec/*.spec.js', ['jasmine']);
});

gulp.task('jasmine', function () {
    return gulp.src('spec/*.spec.js')
        .pipe(jasmine());
});

gulp.task('default', ['lint', 'scripts', 'watch','jasmine']);