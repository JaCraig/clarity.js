var gulp = require('gulp');
var del = require('del');

var fontDirectory = './build/less/**/*.+(eot|ttf|woff|svg|woff2|otf)';
var fontOut = './out/';
var fontDist = './dist/';

gulp.task('font:clean', function () {
    del(fontOut);
    return del(fontDist);
});

gulp.task('font:move', function () {
    return gulp.src(fontDirectory)
                .pipe(gulp.dest(fontDist))
                .pipe(gulp.dest(fontOut));
});

gulp.task('font:watch', function () {
    gulp.watch(fontDirectory, gulp.series('font:move'));
});

gulp.task('font:default', gulp.parallel('font:watch', 'font:move'));