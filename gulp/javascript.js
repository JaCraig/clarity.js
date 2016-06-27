var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var benchmark = require('gulp-bench');
var jasmine = require('gulp-jasmine');
var del=require('del');
var runSequence=require('run-sequence');
var cover=require('gulp-coverage');
var license = require('gulp-license');

var javascriptLocation='./tmp/js/**/*.js';
var javascriptBenchmarkLocation='./test/benchmark/**/*.js';
var javascriptTestLocation='./test/tests/**/*.js';
var javascriptOut='./out/js';
var javascriptDist='./dist/js';
var javascriptReportOut='./reports/coverage';
var javascriptDebugDir='./tmp/debug';

gulp.task('javascript:clean',function(){
    del(javascriptLocation);
    del(javascriptOut);
    return del(javascriptDist);
})

gulp.task('javascript:test',function(){
   return gulp.src(javascriptTestLocation)
              .pipe(cover.instrument({
                    pattern: [javascriptLocation],
                    debugDirectory: javascriptDebugDir
              }))
              .pipe(jasmine({IncludeStackTrace:true}))
              .pipe(cover.gather())
              .pipe(cover.format())
              .pipe(gulp.dest(javascriptReportOut)); 
});

gulp.task('javascript:benchmark',function(){
    return gulp.src(javascriptBenchmarkLocation)
               .pipe(benchmark());
});

gulp.task('javascript:minify', function () {
  var temp=gulp.src(javascriptLocation)
    .pipe(sourcemaps.init())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(license('Apache', {tiny: true,organization:'James Craig',year:'2016'}))
    .pipe(sourcemaps.write('.'));
    temp.pipe(gulp.dest(javascriptOut))
    return temp.pipe(gulp.dest(javascriptDist));
});

gulp.task('javascript:watch', function() {
    gulp.watch(javascriptLocation, ['javascript:minify','javascript:benchmark','javascript:test']);
    gulp.watch(javascriptBenchmarkLocation, ['javascript:benchmark']);
    gulp.watch(javascriptTestLocation, ['javascript:test']);
});

gulp.task('javascript:default',function(cb) {
     return runSequence('javascript:minify',
                 'javascript:test',
                 'javascript:benchmark',
                 'javascript:watch',
                 cb);
});