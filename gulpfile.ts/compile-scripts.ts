/**
 * Tasks: Compile Scripts
 *
 * Bundles JS
 * Transpiles es6 to es2015
 * Writes sourcemaps
 */

// Dependencies
import * as sourcemaps from 'gulp-sourcemaps'
import * as browserify from 'browserify'
import * as tsify from 'tsify'
import * as babelify from 'babelify'
import * as terser from 'gulp-terser'
import * as buffer from 'vinyl-buffer'
import * as gulpif from 'gulp-if'
import * as source from 'vinyl-source-stream'

module.exports = (gulp: any, paths: any, environment: any) => () => {

    return browserify(
        {
            'entries': `${paths.src.script}/index.ts`,
            'debug': true
        })
        .plugin(tsify, { noImplicitAny: true })
        .transform(babelify)
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gulpif(environment !== 'prod', sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(environment === 'prod', terser({ mangle: {toplevel: true} })))
        .pipe(gulpif(environment !== 'prod', sourcemaps.write('./')))
        .pipe(gulp.dest(paths.dist.script));
}