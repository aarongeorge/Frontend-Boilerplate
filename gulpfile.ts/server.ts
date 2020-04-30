/**
 * Tasks: Server
 *
 * Runs a server, serving up the contents in paths.webroot.root on port 1337
 * It also supports the History API for SPA's
 */

// Dependencies
import * as historyApiFallback from 'connect-history-api-fallback'

// Task
module.exports = (paths: any, browserSync: any) => () => {
    browserSync.init({
        ghostMode: false,
        middleware: [historyApiFallback()],
        notify: true,
        port: 1337,
        server: {
            baseDir: paths.dist.root,
            directory: false
        }
    })
}
