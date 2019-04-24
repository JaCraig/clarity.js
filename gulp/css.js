var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var importCSS = require('gulp-import-css');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var license = require('gulp-license');

var cssLocation = './tmp/css/**/*.css';
var cssMainFile = './tmp/css/main.css';
var cssOutputFile = 'clarity.min.css';
var cssOut = './out/css';
var cssDist = './dist/css';

gulp.task('css:clean', function () {
    del(cssLocation);
    del(cssOut);
    return del(cssDist);
});

gulp.task('css:minify', function () {
    var temp = gulp.src(cssMainFile)
        .pipe(importCSS())
        .pipe(rename(cssOutputFile))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%']
        }))
        .pipe(cssnano())
        .pipe(license('Apache', {
            tiny: true,
            organization: 'James Craig',
            year: '2016'
        }));
    temp.pipe(gulp.dest(cssOut));
    return temp.pipe(gulp.dest(cssDist));
});

gulp.task('css:watch', function () {
    return gulp.watch(cssLocation, gulp.series('css:minify'));
});

gulp.task('css:default', gulp.series('css:minify', 'css:watch'));