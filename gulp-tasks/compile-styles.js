/**
 * Tasks: Compile Styles
 *
 * Compiles SASS to CSS
 * Writes Sourcemaps
 * Autoprefixes
 */

// Dependencies
const autoprefixer = require('autoprefixer');
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sassVars = require('gulp-sass-vars');
const sourcemaps = require('gulp-sourcemaps');

// Task
module.exports = (gulp, paths, environment) => {
    return () => {
        return gulp.src(`${paths.src.styles}main.scss`)
            .pipe(sassVars(environment === 'local' ? {'DEBUG': true} : {'DEBUG': false}))
            .pipe(gulpif(environment !== 'prod', sourcemaps.init()))
            .pipe(sass({
                'outputStyle': 'expanded',
                'precision': 14,
                'includePaths': ['node_modules/']
            }))
            .pipe(postcss([autoprefixer()]))
            .pipe(gulpif(environment !== 'prod', sourcemaps.write('./')))
            .pipe(gulp.dest(paths.webroot.styles));
    };
};
