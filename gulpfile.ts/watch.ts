/**
 * Tasks: Watch
 *
 * Watches for file changes and runs appropriate tasks
 */

// Task
module.exports = (gulp: any, paths: any, browserSync: any) => () => {

    // HTML
    gulp.watch([
        `${paths.src.html}/**/*`,
        `${paths.src.font}/**/*`,
        `${paths.src.image}/**/*`
    ],
    gulp.series('compile-templates', 'copy', 'replace-environment-variables', (cb: any) => {
        browserSync.reload()
        cb()
    })).on('error', function handleError () {
        this.emit('end')
    })

    // JS
    gulp.watch([`${paths.src.script}/**/*`],
        gulp.series('compile-scripts', 'replace-environment-variables', (cb: any) => {
            browserSync.reload()
            cb()
        })).on('error', function handleError () {
        this.emit('end')
    })

    // SCSS
    gulp.watch([`${paths.src.style}/**/*`],
        gulp.series('compile-styles', 'replace-environment-variables', (cb: any) => {
            browserSync.reload('index.css')
            cb()
        })).on('error', function handleError () {
        this.emit('end')
    })
}
