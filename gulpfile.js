var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('default', gulp.parallel('server:default',
    'less:default',
    'typescript:default',
    'javascript:default',
    'css:default',
    'html:default',
    'images:default',
    'font:default'));