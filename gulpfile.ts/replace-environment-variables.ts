/**
 * Tasks: Replace Environment Variables
 *
 * Replaces all environment variables with their corresponding environment values
 */

// Dependencies
import * as flatmap from 'gulp-flatmap'
import * as replace from 'gulp-replace'

// Task
module.exports = (gulp: any, paths: any, environment: any, environmentVariables: any) => () => gulp.src([
    `${paths.dist.html}/**/*`,
    `${paths.dist.script}/**/*`,
    `${paths.dist.style}/**/*`
],
{base: paths.dist.root})
    .pipe(flatmap((stream: any) => {
        for (let i = 0; i < environmentVariables[environment].length; i++) stream.pipe(replace(environmentVariables[environment][i].replaceString, environmentVariables[environment][i].value))
        return stream
    }))
    .pipe(gulp.dest(paths.dist.root))
