/**
 * Tasks: Server
 *
 * Runs a server, serving up the contents in paths.webroot.root on port 1337
 */

// Task
module.exports = function (gulp, paths, browserSync) {
    return function () {
        browserSync.init({
            'server': {
                'baseDir': paths.webroot.root,
                'directory': true
            },
            'ghostMode': false,
            'port': 1337,
            'notify': true
        });
    };
};
