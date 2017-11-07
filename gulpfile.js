/**
 * Gulpfile
 */

// Dependencies
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// Set the default environment
gulp.environment = 'local';

// Paths
const paths = {
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
const environmentVariables = {
    'local': [
        {
            'replaceString': '{{envPath}}',
            'value': ''
        },
        {
            'replaceString': '{{cacheBuster}}',
            'value': Number(new Date())
        }
    ],
    'dev': [
        {
            'replaceString': '{{envPath}}',
            'value': ''
        },
        {
            'replaceString': '{{cacheBuster}}',
            'value': Number(new Date())
        }
    ],
    'qa': [
        {
            'replaceString': '{{envPath}}',
            'value': ''
        },
        {
            'replaceString': '{{cacheBuster}}',
            'value': Number(new Date())
        }
    ],
    'uat': [
        {
            'replaceString': '{{envPath}}',
            'value': ''
        },
        {
            'replaceString': '{{cacheBuster}}',
            'value': Number(new Date())
        }
    ],
    'prod': [
        {
            'replaceString': '{{envPath}}',
            'value': ''
        },
        {
            'replaceString': '{{cacheBuster}}',
            'value': Number(new Date())
        }
    ]
};

// Iterate over `environmentVariables` keys
for (const env of Object.keys(environmentVariables)) {

    // Check if `env` was passed to gulp
    if (process.argv.indexOf(`--${env}`) > -1) {

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
gulp.task('watch', () => {

    // HTML
    gulp.watch(
        [
            `${paths.src.root}**/*.html`,
            `${paths.src.fonts}**/*`,
            `${paths.src.images}**/*`
        ],
        gulp.series('copy', 'replace-environment-variables', (cb) => {
            browserSync.reload();
            cb();
        }))
        .on('error', function handleError () {
            this.emit('end');
        });

    // JS
    gulp.watch(
        [`${paths.src.scripts}**/*.js`],
        gulp.series('compile-scripts', 'replace-environment-variables', (cb) => {
            browserSync.reload();
            cb();
        }))
        .on('error', function handleError () {
            this.emit('end');
        });

    // SCSS
    gulp.watch(
        [`${paths.src.styles}**/*.scss`],
        gulp.series('compile-styles', 'replace-environment-variables', (cb) => {
            browserSync.reload('main.css');
            cb();
        }))
        .on('error', function handleError () {
            this.emit('end');
        });
});

// Default
gulp.task('default',
    gulp.series('clean', 'copy',
        gulp.parallel('compile-scripts', 'compile-styles'),
        gulp.parallel('replace-environment-variables'),
        gulp.parallel('server', 'watch')
    )
);

// Build
gulp.task('build',
    gulp.series('clean', 'copy',
        gulp.parallel('compile-scripts', 'compile-styles'),
        gulp.parallel('replace-environment-variables')
    )
);
