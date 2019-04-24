var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var del = require('del');

var htmlLocation = './build/html/**/*.html';
var htmlOut = './out';

gulp.task('html:clean', function () {
    return del(htmlOut);
});

gulp.task('html:minify', function () {
    return gulp.src(htmlLocation)
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true,
            minifyhtml: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest(htmlOut));
});

gulp.task('html:watch', function () {
    gulp.watch(htmlLocation, gulp.series('html:minify'));
});

gulp.task('html:default', gulp.series('html:watch', 'html:minify'));