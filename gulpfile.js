/**
 * Gulpfile
 */

// Module definitions
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var del = require('del');
var gulp = require('gulp');
var ignore = require('gulp-ignore');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

// Paths
var paths = {
    'src': {
        'images': './src/img/',
        'root': './src/',
        'scripts': './src/js/',
        'styles': './src/scss/',
        'fonts': './src/fonts/'
    },
    'webroot': {
        'images': './webroot/img/',
        'root': './webroot/',
        'scripts': './webroot/js/',
        'styles': './webroot/css/',
        'fonts': './webroot/fonts/'
    }
};

// Environment paths
var environmentPaths = {
    'replaceString': '{{envPath}}',
    'dev': '',
    'prod': 'https://yourproductionsite.com'
};

// Set the environment
gulp.environment = process.argv.indexOf('--prod') === -1 ? 'dev' : 'prod';

/**
 * Clean
 *
 * Cleans the webroot directory
 */
gulp.task('clean', function () {
    'use strict';

    return del([paths.webroot.root + '**/*']);
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
        ],
        {
            'base': paths.src.root
        }
    )
    .pipe(gulp.dest(paths.webroot.root));
});

/**
 * Replace HTML envPath
 *
 * Replaces HTML page envPath with current envPath
 */
gulp.task('htmlEnvPath', function () {
    'use strict';

    return gulp.src(paths.src.root + '**/*.html')
        .pipe(replace(environmentPaths.replaceString, environmentPaths[gulp.environment]))
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
            'outputStyle': 'expanded',
            'precision': 14
        }))
        .pipe(replace(environmentPaths.replaceString, environmentPaths[gulp.environment]))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.webroot.styles))
        .pipe(ignore.exclude('*.map'))
        .pipe(browserSync.reload({
            'stream': true
        }));
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
            'entries': [paths.src.scripts + 'main.js'],
            'debug': true
        })
        .transform(babelify, {
            'presets': ['es2015']
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(replace(environmentPaths.replaceString, environmentPaths[gulp.environment]))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            'loadMaps': true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.webroot.scripts));
});

/**
 * Scripts
 *
 * Runs bundleScripts
 */
gulp.task('scripts', gulp.task('bundleScripts'));

/**
 * Server
 *
 * Runs a server, serving up the contents in paths.webroot.root on port 1337
 */
gulp.task('server', function () {
    'use strict';

    browserSync({
        'server': {
            'baseDir': paths.webroot.root,
            'directory': true
        },
        'port': 1337,
        'notify': true
    });
});

/**
 * Watch
 *
 * Watches files and runs the correct tasks
 */
gulp.task('watch', function () {
    'use strict';

    gulp.watch([paths.src.fonts + '**/*'], gulp.series(browserSync.reload));
    gulp.watch([paths.src.images + '**/*'], gulp.series(browserSync.reload));
    gulp.watch([paths.src.root + '**/*.html', paths.src.images + '**/*', paths.src.fonts + '**/*'], gulp.series('copy', 'htmlEnvPath', browserSync.reload));
    gulp.watch([paths.src.scripts + '**/*.js'], gulp.series('scripts', browserSync.reload));
    gulp.watch([paths.src.styles + '**/*.scss'], gulp.task('styles'));
});

// Default Task
gulp.task('default',
    gulp.series('clean', 'copy',
        gulp.parallel('htmlEnvPath', 'scripts', 'styles'),
        gulp.parallel('server', 'watch')
    )
);

// Build tasks
gulp.task('build',
    gulp.series('clean', 'copy',
        gulp.parallel('htmlEnvPath', 'scripts', 'styles')
    )
);
