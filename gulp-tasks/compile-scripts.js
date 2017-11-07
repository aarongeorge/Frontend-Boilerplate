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
const uglify = require('gulp-uglify');

module.exports = (gulp, paths) => {
    return () => {
        const entries = [
            {
                'filename': 'main.js',
                'basePath': `${paths.src.scripts}`,
                'outputPath': `${paths.webroot.scripts}`,
                'rename': 'main'
            }
        ];

        return merge(entries.map((entry) => {
            return browserify(
                {
                    'entries': entry.basePath + entry.filename,
                    'debug': true
                })
                .transform(babelify, {
                    'presets': [
                        'env',
                        'stage-2'
                    ]
                })
                .bundle()
                .pipe(source(entry.filename))
                .pipe(rename({
                    'basename': entry.rename
                }))
                .pipe(buffer())
                .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.init({'loadMaps': true})))
                .pipe(gulpif(gulp.environment === 'prod', uglify()))
                .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.write('./')))
                .pipe(gulp.dest(entry.outputPath));
        }));
    };
};
