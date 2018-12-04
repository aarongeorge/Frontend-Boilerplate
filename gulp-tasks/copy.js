/**
 * Tasks: Copy
 *
 * Copies all static files to the webroot
 */

// Task
module.exports = (gulp, paths) => {
    return () => {
        return gulp.src(
            [
                `${paths.src.fonts}**/*`,
                `${paths.src.images}**/*`,
                `${paths.src.root}{*.html,*.ico}`
            ],
            {'base': paths.src.root})
            .pipe(gulp.dest(paths.webroot.root));
    };
};
