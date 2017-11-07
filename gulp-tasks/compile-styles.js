/**
 * Tasks: Compile Styles
 *
 * Compiles SASS to CSS
 * Writes Sourcemaps
 * Autoprefixes
 */

// Dependencies
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const sassVars = require('gulp-sass-vars');

// Task
module.exports = (gulp, paths) => {
    return () => {
        return gulp.src(`${paths.src.styles}main.scss`)
            .pipe(sassVars(gulp.environment === 'local' ? {'DEBUG': true} : {'DEBUG': false}))
            .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.init()))
            .pipe(sass({
                'outputStyle': 'expanded',
                'precision': 14,
                'includePaths': ['node_modules/']
            }))
            .pipe(autoprefixer())
            .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.write('./')))
            .pipe(gulp.dest(paths.webroot.styles));
    };
};
