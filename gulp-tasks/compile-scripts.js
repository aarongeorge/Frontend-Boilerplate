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
const merge = require('merge-stream');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const tsify = require('tsify');
const uglify = require('gulp-uglify');

// Task
module.exports = (gulp, paths, environment) => {
    return () => {
        const entries = [
            {
                'filename': 'main.js',
                'basePath': paths.src.scripts,
                'outputPath': paths.webroot.scripts,
                'rename': 'main'
            }
        ];

        return merge(entries.map((entry) => {
            return browserify(
                {
                    'entries': entry.basePath + entry.filename,
                    'debug': true
                })
                .plugin(tsify)
                .transform(babelify)
                .bundle()
                .pipe(source(entry.filename))
                .pipe(rename({
                    'basename': entry.rename,
                    'extname': '.js'
                }))
                .pipe(buffer())
                .pipe(gulpif(environment !== 'prod', sourcemaps.init({'loadMaps': true})))
                .pipe(gulpif(environment === 'prod', uglify()))
                .pipe(gulpif(environment !== 'prod', sourcemaps.write('./')))
                .pipe(gulp.dest(entry.outputPath));
        }));
    };
};
