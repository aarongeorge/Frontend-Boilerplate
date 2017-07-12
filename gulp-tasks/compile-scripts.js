/**
 * Tasks: Compile Scripts
 *
 * Bundles JS
 * Transpiles es6 to es2015
 * Writes sourcemaps
 */

// Dependencies
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const gulpif = require('gulp-if');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

// Task
module.exports = (gulp, paths) => {
    return () => {
        return browserify(
            {
                'entries': [`${paths.src.scripts}main.js`],
                'debug': true
            })
            .transform(babelify, {
                'presets': [
                    'es2015',
                    'stage-2'
                ]
            })
            .bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.init({'loadMaps': true})))
            .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.write('./')))
            .pipe(gulp.dest(paths.webroot.scripts));
    };
};
