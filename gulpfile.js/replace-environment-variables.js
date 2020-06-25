/**
 * Tasks: Replace Environment Variables
 *
 * Replaces all environment variables with their corresponding environment values
 */

// Dependencies
const flatmap = require('gulp-flatmap')
const replace = require('gulp-replace')

// Task
module.exports = ({ gulp, paths, environment, environmentVariables }) => () => gulp.src([`${paths.dist.root}/**/*`], {base: paths.dist.root})
.pipe(flatmap(stream => {
	for (let i = 0; i < environmentVariables[environment].length; i++) stream.pipe(replace(environmentVariables[environment][i].replaceString, environmentVariables[environment][i].value))
	return stream
}))
.pipe(gulp.dest(paths.dist.root))
