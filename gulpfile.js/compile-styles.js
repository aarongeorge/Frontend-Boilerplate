/**
 * Tasks: Compile Styles
 *
 * Compiles SASS to CSS
 * Writes Sourcemaps
 * Autoprefixes
 */

// Dependencies
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const purgecss = require('gulp-purgecss')

// Task
module.exports = (gulp, paths, environment) => () => gulp.src(`${paths.src.style}/index.pcss`)
    .pipe(rename(path => path.extname = '.css'))
    .pipe(gulpif(environment !== 'prod', sourcemaps.init()))
    .pipe(postcss())
    .pipe(gulpif(environment === 'prod', purgecss({ content: [`${paths.src.root}/**/*.*`] })))
    .pipe(gulpif(environment !== 'prod', sourcemaps.write('./')))
    .pipe(gulp.dest(paths.dist.style))
