/**
 * Tasks: Watch
 *
 * Watches for file changes and runs appropriate tasks
 */

// Task
module.exports = (gulp, paths, browserSync) => () => {

    // HTML
    gulp.watch([
        `${paths.src.html}/**/*`,
        `${paths.src.font}/**/*`,
        `${paths.src.image}/**/*`
    ],
    gulp.series('compile-templates', 'copy', 'replace-environment-variables', cb => {
        browserSync.reload()
        cb()
    })).on('error', function handleError () {
        this.emit('end')
    })

    // JS
    gulp.watch([`${paths.src.script}/**/*`],
        gulp.series('compile-scripts', 'replace-environment-variables', cb => {
            browserSync.reload()
            cb()
        })).on('error', function handleError () {
        this.emit('end')
    })

    // SCSS
    gulp.watch([`${paths.src.style}/**/*`],
        gulp.series('compile-styles', 'replace-environment-variables', cb => {
            browserSync.reload('index.css')
            cb()
        })).on('error', function handleError () {
        this.emit('end')
    })
}
