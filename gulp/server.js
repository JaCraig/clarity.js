var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

var serverWatch = 'out/**/*.*';
var serverConnect = './out';

gulp.task('server:connect', function () {
  return connect.server({
    root: serverConnect,
    livereload: true
  });
});

gulp.task('server:watch', function () {
  watch(serverWatch).pipe(connect.reload());
});

gulp.task('server:default', gulp.parallel('server:connect',    'server:watch'));