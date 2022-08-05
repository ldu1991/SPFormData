'use strict';

const {src, dest, watch, series} = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const umd = require('gulp-umd');
const rename = require('gulp-rename');

function onError(e) {
    console.log(e.toString());
    this.emit('end');
}

function jsBuild() {
    return src('./src/sp-form-data.js')
        .pipe(plumber({errorHandler: onError}))
        //.pipe(babel({presets: ['@babel/env']}))
        .pipe(umd({
            exports: function(file) {
                return 'SPFormData';
            },
            namespace: function(file) {
                return 'SPFormData';
            }
        }))
        //.pipe(dest('dist/'))
        //.pipe(uglify())
        //.pipe(rename({suffix: '.min'}))
        .pipe(dest('dist/'));
}

function watchTask(cb) {
    watch('./src/sp-form-data.js', {cwd: './'}, series(jsBuild));
    cb()
}

exports.jsBuild = jsBuild;
exports.watchTask = watchTask;

exports.default = series(jsBuild, watchTask);
