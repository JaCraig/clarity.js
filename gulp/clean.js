var gulp = require('gulp');
var del = require('del');

var outDir='./out';
var distDir='./dist';
var tmpDir='./tmp';

gulp.task('clean:all', function () {
    del(outDir);
    del(distDir);
    return del(tmpDir);
});