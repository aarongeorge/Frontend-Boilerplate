/**
 * Gulpfile
 */

// Dependencies
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Set the default environment
gulp.environment = 'local';

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

// Iterate over `environmentVariables` keys
for (let env of Object.keys(environmentVariables)) {

    // Check if `env` was passed to gulp
    if (process.argv.indexOf('--' + env) > -1) {

        // Set `gulp.environment` to `env`
        gulp.environment = env;
        break;
    }
}

// Tasks
gulp.task('clean', require('./gulp-tasks/clean')(paths));
gulp.task('copy', require('./gulp-tasks/copy')(gulp, paths));
gulp.task('compile-scripts', require('./gulp-tasks/compile-scripts')(gulp, paths));
gulp.task('compile-styles', require('./gulp-tasks/compile-styles')(gulp, paths));
gulp.task('replace-environment-variables', require('./gulp-tasks/replace-environment-variables')(gulp, paths, environmentVariables));
gulp.task('server', require('./gulp-tasks/server')(gulp, paths, browserSync));
gulp.task('watch', function () {

    // HTML
    gulp.watch([paths.src.root + '**/*.html', paths.src.fonts + '**/*', paths.src.images + '**/*'], gulp.series('copy', 'replace-environment-variables', function (cb) {
        browserSync.reload();
        cb();
    }));

    // JS
    gulp.watch([paths.src.scripts + '**/*.js'], gulp.series('compile-scripts', 'replace-environment-variables', function (cb) {
        browserSync.reload();
        cb();
    }));

    // SCSS
    gulp.watch([paths.src.styles + '**/*.scss'], gulp.series('compile-styles', 'replace-environment-variables', function (cb) {
        browserSync.reload('main.css');
        cb();
    }));
});

gulp.task('default',
    gulp.series('clean', 'copy',
        gulp.parallel('compile-scripts', 'compile-styles'),
        gulp.parallel('replace-environment-variables'),
        gulp.parallel('server', 'watch')
    )
);
gulp.task('build',
    gulp.series('clean', 'copy',
        gulp.parallel('compile-scripts', 'compile-styles'),
        gulp.parallel('replace-environment-variables')
    )
);
