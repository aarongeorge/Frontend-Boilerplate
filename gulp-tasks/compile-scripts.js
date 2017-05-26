/**
 * Tasks: Compile Scripts
 *
 * Bundles JS
 * Transpiles es6 to es2015
 * Writes sourcemaps
 */

// Dependencies
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulpif = require('gulp-if');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

// Task
module.exports = function (gulp, paths) {
    return function () {
        return browserify({
            'entries': [paths.src.scripts + 'main.js'],
            'debug': true
        })
        .transform(babelify, {
            'presets': ['es2015']
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.init({
            'loadMaps': true
        })))
        .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.write('./')))
        .pipe(gulp.dest(paths.webroot.scripts));
    };
};
