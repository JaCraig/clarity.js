var gulp = require('gulp');
var image = require('gulp-image');
var del = require('del');

var imagesLocation = './build/images/**/*.+(jpg|jpeg|gif|png)';
var imagesLessLocation = './build/less/**/*.+(jpg|jpeg|gif|png)';
var imagesOut = './out/images';
var imagesLessOut = './out/css/';
var imagesLessDist = './dist/css/';

gulp.task('images:clean', function () {
    del(imagesOut);
    del(imagesLessOut);
    return del(imagesLessDist);
});

gulp.task('images:minify', function () {
    var temp = gulp.src(imagesLessLocation)
        .pipe(image());
    temp.pipe(gulp.dest(imagesLessDist));
    return temp.pipe(gulp.dest(imagesLessOut));
});

gulp.task('images:example-images', function () {
    return gulp.src(imagesLocation)
        .pipe(image())
        .pipe(gulp.dest(imagesOut));
});

gulp.task('images:watch', function () {
    gulp.watch(imagesLocation, gulp.series('images:example-images'));
    gulp.watch(imagesLessLocation, gulp.series('images:minify'));
});

gulp.task('images:default', gulp.series('images:minify', 'images:example-images', 'images:watch'));