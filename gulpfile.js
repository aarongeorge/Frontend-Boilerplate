/**
 * Gulpfile
 */

// Module definitions
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var del = require('del');
var flatmap = require('gulp-flatmap');
var gulp = require('gulp');
var gulpif = require('gulp-if');
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

// Environment variables
var environmentVariables = {
    'local': [
        {
            'replaceString': '{{envPath}}',
            'value': ''
        }
    ],
    'dev': [
        {
            'replaceString': '{{envPath}}',
            'value': 'https://dev.example.com'
        }
    ],
    'qa': [
        {
            'replaceString': '{{envPath}}',
            'value': 'https://qa.example.com'
        }
    ],
    'uat': [
        {
            'replaceString': '{{envPath}}',
            'value': 'https://uat.example.com'
        }
    ],
    'prod': [
        {
            'replaceString': '{{envPath}}',
            'value': 'https://example.com'
        }
    ]
};

// Set the default environment
gulp.environment = 'local';

// Check for environment flag being passed to gulp
if (process.argv.indexOf('--local') > -1) {
    gulp.environment = 'local';
}

else if (process.argv.indexOf('--dev') > -1) {
    gulp.environment = 'dev';
}

else if (process.argv.indexOf('--qa') > -1) {
    gulp.environment = 'qa';
}

else if (process.argv.indexOf('--uat') > -1) {
    gulp.environment = 'uat';
}

else if (process.argv.indexOf('--prod') > -1) {
    gulp.environment = 'prod';
}

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
            paths.src.fonts + '**/*',
            paths.src.images + '**/*',
            paths.src.root + '**/*.html'
        ],
        {
            'base': paths.src.root
        }
    )
    .pipe(gulp.dest(paths.webroot.root));
});

/**
 * Replace environment variables
 *
 * Replaces all environment variables with their corresponding environment values
 */
gulp.task('replaceEnvironmentVariables', function () {
    'use strict';

    return gulp.src([
            paths.webroot.root + '**/*.html',
            paths.webroot.scripts + '**/*',
            paths.webroot.styles + '**/*'
        ],
        {
            'base': paths.webroot.root
        }
    )
    .pipe(flatmap(function (stream) {
        for (var i = 0; i < environmentVariables[gulp.environment].length; i++) {
            stream.pipe(replace(environmentVariables[gulp.environment][i].replaceString, environmentVariables[gulp.environment][i].value));
        }

        return stream;
    }))
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
        .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.init()))
        .pipe(sass({
            'outputStyle': 'expanded',
            'precision': 14
        }))
        .pipe(autoprefixer())
        .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.write('./')))
        .pipe(gulp.dest(paths.webroot.styles));
});

/**
 * Scripts
 *
 * Bundles JS
 * Transpiles es6 to es2015
 * Writes sourcemaps
 */
gulp.task('scripts', function () {
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
        .pipe(buffer())
        .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.init({
            'loadMaps': true
        })))
        .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.write('./')))
        .pipe(gulp.dest(paths.webroot.scripts));
});

/**
 * Server
 *
 * Runs a server, serving up the contents in paths.webroot.root on port 1337
 */
gulp.task('server', function () {
    'use strict';

    browserSync.init({
        'server': {
            'baseDir': paths.webroot.root,
            'directory': true
        },
        'ghostMode': false,
        'port': 1337,
        'notify': true
    });
});

/**
 * injectCSS
 *
 * Injects CSS into browserSync instance
 */
gulp.task('injectCSS', function () {
    'use strict';

    browserSync.reload('main.css');
});

/**
 * Watch
 *
 * Watches files and runs the correct tasks
 */
gulp.task('watch', function () {
    'use strict';

    gulp.watch([paths.src.root + '**/*.html', paths.src.fonts + '**/*', paths.src.images + '**/*'], gulp.series('copy', 'replaceEnvironmentVariables', browserSync.reload));
    gulp.watch([paths.src.scripts + '**/*.js'], gulp.series('scripts', 'replaceEnvironmentVariables', browserSync.reload));
    gulp.watch([paths.src.styles + '**/*.scss'], gulp.series('styles', 'replaceEnvironmentVariables', 'injectCSS'));
});

// Default Task
gulp.task('default',
    gulp.series('clean', 'copy',
        gulp.parallel('scripts', 'styles'),
        gulp.parallel('replaceEnvironmentVariables'),
        gulp.parallel('server', 'watch')
    )
);

// Build tasks
gulp.task('build',
    gulp.series('clean', 'copy',
        gulp.parallel('scripts', 'styles'),
        gulp.parallel('replaceEnvironmentVariables')
    )
);
