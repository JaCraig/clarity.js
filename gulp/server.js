var gulp = require('gulp');
var connect = require('gulp-connect');
var runSequence=require('run-sequence');

var serverWatch='out/**/*.*';
var serverConnect='./out';

gulp.task('server:connect', function() {
  connect.server({
    root: serverConnect,
    livereload: true
  });
});

gulp.task('server:reload',function(){
    connect.reload();
});

gulp.task('server:watch', function() {
    gulp.watch(serverWatch, ['server:reload']);
});

gulp.task('server:default',function(cb) {
     runSequence('server:connect',
                 'server:watch',
                 cb);
});