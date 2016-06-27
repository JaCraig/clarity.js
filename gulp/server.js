var gulp = require('gulp');
var connect = require('gulp-connect');
var runSequence=require('run-sequence');
var watch=require('gulp-watch');

var serverWatch='out/**/*.*';
var serverConnect='./out';

gulp.task('server:connect', function() {
  return connect.server({
    root: serverConnect,
    livereload: true
  });
});

gulp.task('server:watch', function() {
    watch(serverWatch).pipe(connect.reload());
});

gulp.task('server:default',function(cb) {
     return runSequence('server:connect',
                 'server:watch',
                 cb);
});