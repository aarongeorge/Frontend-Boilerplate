/**
 * Tasks: Replace Environment Variables
 *
 * Replaces all environment variables with their corresponding environment values
 */

// Dependencies
const flatmap = require('gulp-flatmap');
const replace = require('gulp-replace');

// Task
module.exports = (gulp, paths, environmentVariables) => {
    return () => {
        return gulp.src(
            [
                `${paths.webroot.root}**/*.html`,
                `${paths.webroot.scripts}**/*`,
                `${paths.webroot.styles}**/*`
            ],
            {'base': paths.webroot.root})
            .pipe(flatmap((stream) => {
                for (let i = 0; i < environmentVariables[gulp.environment].length; i++) {
                    stream.pipe(replace(environmentVariables[gulp.environment][i].replaceString, environmentVariables[gulp.environment][i].value));
                }

                return stream;
            }))
            .pipe(gulp.dest(paths.webroot.root));
    };
};
