/**
 * Tasks: Compile Templates
 *
 * Compiles Pug files to HTML
 */

// Dependencies
import * as gulppug from 'gulp-pug'

// Task
module.exports = (gulp: any, paths: any) => () => gulp.src(`${paths.src.html}/**/*.pug`)
    .pipe(gulppug())
    .pipe(gulp.dest(paths.dist.html))
