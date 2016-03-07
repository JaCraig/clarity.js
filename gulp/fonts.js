var gulp = require('gulp');
var del=require('del');

var fontDirectory='./build/less/**/*.+(eot|ttf|woff|svg)';
var fontOut='./out/css/';
var fontDist='./dist/css/';

gulp.task('font:clean',function(){
    del(fontOut);
    return del(fontDist);
});

gulp.task('font:move', function () {
    var temp=gulp.src(fontDirectory);
    temp.pipe(gulp.dest(fontDist));
    return temp.pipe(gulp.dest(fontOut));
});

gulp.task('font:watch', function() {
    gulp.watch(fontDirectory, ['font:move']);
});

gulp.task('font:default',['font:watch','font:move']);