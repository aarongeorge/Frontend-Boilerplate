/**
 * Tasks: Compile Templates
 *
 * Compiles Pug files to HTML
 */

// Dependencies
const gulppug = require('gulp-pug')

// Task
module.exports = ({gulp, paths}) => () => gulp.src(`${paths.src.root}/**/*.pug`)
.pipe(gulppug())
.pipe(gulp.dest(paths.dist.root))
