/**
 * Tasks: Replace Environment Variables
 *
 * Replaces all environment variables with their corresponding environment values
 */

// Dependencies
var flatmap = require('gulp-flatmap');
var replace = require('gulp-replace');

// Task
module.exports = function (gulp, paths, environmentVariables) {
    return function () {
        return gulp.src([
            paths.webroot.root + '**/*.html',
            paths.webroot.scripts + '**/*',
            paths.webroot.styles + '**/*'
        ], {
            'base': paths.webroot.root
        })
        .pipe(flatmap(function (stream) {
            for (var i = 0; i < environmentVariables[gulp.environment].length; i++) {
                stream.pipe(replace(environmentVariables[gulp.environment][i].replaceString, environmentVariables[gulp.environment][i].value));
            }

            return stream;
        }))
        .pipe(gulp.dest(paths.webroot.root));
    };
};

