/**
 * Tasks: Server
 *
 * Runs a server, serving up the contents in paths.webroot.root on port 1337
 * It also supports the History API for SPA's
 */

// Dependencies
const historyApiFallback = require('connect-history-api-fallback');

// Task
module.exports = (gulp, paths, browserSync) => {
    return () => {
        browserSync.init({
            'ghostMode': false,
            'middleware': [historyApiFallback()],
            'notify': true,
            'port': 1337,
            'server': {
                'baseDir': paths.webroot.root,
                'directory': false
            }
        });
    };
};
