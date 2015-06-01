/**
 * Gulpfile
 */

// Package.json reference
var packageJSON = require('./package');

// Module definitions
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var del = require('del');
var gulp = require('gulp');
var ignore = require('gulp-ignore');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

// Paths
var paths = {
    src: {
        images:  './src/img/',
        root:    './src/',
        scripts: './src/js/',
        styles:  './src/scss/',
        fonts:   './src/fonts/'
    },
    webroot: {
        images:  './webroot/img/',
        root:    './webroot/',
        scripts: './webroot/js/',
        styles:  './webroot/css/',
        fonts:   './webroot/fonts/'
    }
};

/**
 * Clean
 *
 * Cleans the webroot directory
 */
gulp.task('clean', function (done) {
    'use strict';

    del(paths.webroot.root + '**/*', {
        force: true
    }, done);
});

/**
 * Copy
 *
 * Copies all static files to the webroot
 */
gulp.task('copy', function () {
    'use strict';

    return gulp.src([
            paths.src.root + '**/*.html',
            paths.src.images + '**/*',
            paths.src.fonts + '**/*'
        ], {
            base: paths.src.root
        })
        .pipe(gulp.dest(paths.webroot.root));
});

/**
 * Styles
 *
 * Compiles SASS to CSS
 * Writes Sourcemaps
 * Autoprefixes
 * Live-reloads browser
 */
gulp.task('styles', function () {
    'use strict';

    return gulp.src(paths.src.styles + 'main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 14,
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.webroot.styles))
        .pipe(ignore.exclude('*.map'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/**
 * Lint Scripts
 *
 * Lints all scripts in the scripts folder
 */
gulp.task('lintScripts', function () {
    'use strict';

    return gulp.src(paths.src.scripts + '**/*.js')
        .pipe(jshint(packageJSON.jshintConfig))
        .pipe(jshint.reporter(jshintStylish));
});

/**
 * Bundle Scripts
 *
 * Bundles JS
 * Writes sourcemaps
 */
gulp.task('bundleScripts', function () {
    'use strict';

    return browserify({
            entries: [paths.src.scripts + 'main.js'],
            debug: true
        }).bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.webroot.scripts));
});

/**
 * Scripts
 *
 * Runs lintScripts and bundleScripts
 */
gulp.task('scripts', gulp.series('lintScripts', 'bundleScripts'));

/**
 * Server
 *
 * Runs a server, serving up the contents in paths.webroot.root on port 1337
 */
gulp.task('server', function () {
    'use strict';

    browserSync({
        server: {
            baseDir: paths.webroot.root,
            directory: true
        },
        port: 1337,
        notify: true
    });
});

/**
 * Watch
 *
 * Watches files and runs the correct tasks
 */
gulp.task('watch', function () {
    'use strict';

    gulp.watch([paths.src.root + '**/*.html', paths.src.images + '**/*', paths.src.fonts + '**/*'], gulp.series('copy', browserSync.reload));
    gulp.watch([paths.src.styles + '**/*.scss'], gulp.task('styles'));
    gulp.watch([paths.src.scripts + '**/*.js'], gulp.series('scripts', browserSync.reload));
});

// Default Task
gulp.task('default',
    gulp.series('clean', 'copy',
        gulp.parallel('scripts', 'styles'),
        gulp.parallel('server', 'watch')
    )
);