/**
 * Tasks: Watch
 *
 * Watches for file changes and runs appropriate tasks
 */

// Task
module.exports = (gulp, paths, browserSync) => {
    return () => {

        // HTML
        gulp.watch(
            [
                `${paths.src.root}**/*.html`,
                `${paths.src.fonts}**/*`,
                `${paths.src.images}**/*`
            ],
            gulp.series('copy', 'replace-environment-variables', (cb) => {
                browserSync.reload();
                cb();
            })
        ).on('error', function handleError () {
            this.emit('end');
        });

        // JS
        gulp.watch(
            [`${paths.src.scripts}**/*.js`],
            gulp.series('compile-scripts', 'replace-environment-variables', (cb) => {
                browserSync.reload();
                cb();
            })
        ).on('error', function handleError () {
            this.emit('end');
        });

        // SCSS
        gulp.watch(
            [`${paths.src.styles}**/*.scss`],
            gulp.series('compile-styles', 'replace-environment-variables', (cb) => {
                browserSync.reload('main.css');
                cb();
            })
        ).on('error', function handleError () {
            this.emit('end');
        });
    };
};
