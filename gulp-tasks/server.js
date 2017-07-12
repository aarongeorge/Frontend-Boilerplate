/**
 * Tasks: Server
 *
 * Runs a server, serving up the contents in paths.webroot.root on port 1337
 */

// Task
module.exports = (gulp, paths, browserSync) => {
    return () => {
        browserSync.init({
            'server': {
                'baseDir': paths.webroot.root,
                'directory': false
            },
            'ghostMode': false,
            'port': 1337,
            'notify': true
        });
    };
};
