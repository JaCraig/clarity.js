var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var del=require('del');

var lessLocation='./build/less/**/*.less';
var lessMainFile='./build/less/main.less';
var lessMapLocation='.';
var lessOut='./tmp/css';

gulp.task('less:clean',function(){
    return del(lessOut);
});

gulp.task('less:build', function () {
  return gulp.src(lessMainFile)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write(lessMapLocation))
    .pipe(gulp.dest(lessOut));
});

gulp.task('less:watch', function() {
    gulp.watch(lessLocation, ['less:build']);
});

gulp.task('less:default',['less:build','less:watch']);