var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var benchmark = require('gulp-bench');
var jasmine = require('gulp-jasmine');
var del = require('del');
var cover = require('gulp-coverage');
var license = require('gulp-license');
var concat = require('gulp-concat');

var javascriptLocation = './tmp/js/**/*.js';
var javascriptTestScriptsLocation = './tmp/test/js/**/*.js';
var javascriptBenchmarkLocation = './test/benchmark/**/*.js';
var javascriptTestLocation = './test/tests/**/*.js';
var javascriptMove = './build/js/**/*.js';
var javascriptOut = './out/js';
var javascriptDist = './dist/js';
var javascriptReportOut = './reports/coverage';
var javascriptDebugDir = './tmp/debug';

gulp.task('javascript:move', function () {
    return gulp.src(javascriptMove)
               .pipe(gulp.dest(javascriptOut));
});

gulp.task('javascript:clean', function () {
    del(javascriptLocation);
    del(javascriptOut);
    return del(javascriptDist);
});

gulp.task('javascript:test', function () {
    return gulp.src(javascriptTestLocation)
        .pipe(cover.instrument({
            pattern: [javascriptLocation],
            debugDirectory: javascriptDebugDir
        }))
        .pipe(jasmine({
            IncludeStackTrace: true
        }))
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest(javascriptReportOut));
});

gulp.task('javascript:benchmark', function () {
    return gulp.src(javascriptBenchmarkLocation)
        .pipe(benchmark());
});

gulp.task('javascript:minify', function () {
    return gulp.src(javascriptLocation)
        // .pipe(concat('Clarity.min.js'))
        // .pipe(sourcemaps.init())
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        // .pipe(uglify())
        // .pipe(license('Apache', {
        //     tiny: true,
        //     organization: 'James Craig',
        //     year: '2016'
        // }))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(javascriptOut))
        .pipe(gulp.dest(javascriptDist));
});

gulp.task('javascript:watch', function () {
    gulp.watch(javascriptLocation, gulp.series('javascript:minify', 'javascript:benchmark', 'javascript:test'));
    gulp.watch(javascriptBenchmarkLocation, gulp.series('javascript:benchmark'));
    gulp.watch(javascriptTestLocation, gulp.series('javascript:test'));
    gulp.watch(javascriptTestScriptsLocation,gulp.series('javascript:test'));
});

gulp.task('javascript:default',gulp.parallel('javascript:minify',        'javascript:move',        'javascript:watch'));