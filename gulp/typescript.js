var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var typedoc = require("gulp-typedoc");
var del = require('del');
var tslint = require('gulp-tslint');

var typescriptLocation = './build/ts/**/*.ts';
var typescriptOut = './tmp/js';
var typescriptDefinitionOut = './dist/tsdefinitions';
var typescriptFileOutput = 'clarity.js';
var typescriptDocumentationOut = './out/js/Docs';
var target = 'ES5';
var module = 'system';

gulp.task('typescript:clean', function () {
    del(typescriptDocumentationOut);
    del(typescriptDefinitionOut);
    return del(typescriptOut);
});

gulp.task("typescript:lint", function () {
    return gulp.src(typescriptLocation)
        .pipe(tslint())
        .pipe(tslint.report("verbose"));
});

gulp.task('typescript:build', function () {
    del('./out/js/Docs/**/*.*');
    del('./out/js/Docs');
    gulp.src(typescriptLocation)
        .pipe(typedoc({
            module: module,
            target: target,
            out: typescriptDocumentationOut,
            name: "Clarity.js"
        }));
    var tsResult = gulp.src(typescriptLocation)
        .pipe(ts({
            noImplicitAny: false,
            out: typescriptFileOutput,
            target: target,
            module: module,
            removeComments: true,
            declaration: true
        }));
    return merge([
        tsResult.dts.pipe(gulp.dest(typescriptDefinitionOut)),
        tsResult.js.pipe(gulp.dest(typescriptOut))
    ]);
});

gulp.task('typescript:watch', function () {
    gulp.watch(typescriptLocation, ['typescript:build']);
});

gulp.task('typescript:default', ['typescript:watch', 'typescript:build']);