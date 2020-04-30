/**
 * Tasks: Compile Styles
 *
 * Compiles SASS to CSS
 * Writes Sourcemaps
 * Autoprefixes
 */

// Dependencies
import * as gulpif from 'gulp-if'
import * as sourcemaps from 'gulp-sourcemaps'
import * as postcss from 'gulp-postcss'
import * as rename from 'gulp-rename'
import * as purgecss from 'gulp-purgecss'

// Task
module.exports = (gulp: any, paths: any, environment: any) => () => gulp.src(`${paths.src.style}/index.pcss`)
    .pipe(rename((path: any) => path.extname = '.css'))
    .pipe(gulpif(environment !== 'prod', sourcemaps.init()))
    .pipe(postcss())
    .pipe(gulpif(environment === 'prod', purgecss({ content: [`${paths.src.root}/**/*.*`] })))
    .pipe(gulpif(environment !== 'prod', sourcemaps.write('./')))
    .pipe(gulp.dest(paths.dist.style))
