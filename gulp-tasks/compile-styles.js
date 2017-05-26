/**
 * Tasks: Compile Styles
 *
 * Compiles SASS to CSS
 * Writes Sourcemaps
 * Autoprefixes
 */

// Dependencies
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// Task
module.exports = function (gulp, paths) {
    return function () {
        return gulp.src(paths.src.styles + 'main.scss')
        .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.init()))
        .pipe(sass({
            'outputStyle': 'expanded',
            'precision': 14
        }))
        .pipe(autoprefixer())
        .pipe(gulpif(gulp.environment !== 'prod', sourcemaps.write('./')))
        .pipe(gulp.dest(paths.webroot.styles));
    };
};
