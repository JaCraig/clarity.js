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
    var temp = gulp.src(fontDirectory);
    temp.pipe(gulp.dest(fontDist));
    return temp.pipe(gulp.dest(fontOut));
});

gulp.task('font:watch', function () {
    gulp.watch(fontDirectory, gulp.series('font:move'));
});

gulp.task('font:default', gulp.series('font:watch', 'font:move'));