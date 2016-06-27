var gulp = require('gulp');
var runSequence=require('run-sequence');

require('require-dir')('./gulp');

gulp.task('default',function(cb) {
     return runSequence('server:default',
    'less:default',
    'typescript:default',
    'javascript:default',
    'css:default',
    'html:default',
    'images:default',
    'font:default',
    cb);
});