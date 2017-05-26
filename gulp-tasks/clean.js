/**
 * Tasks: Clean
 *
 * Cleans the webroot directory
 */

// Dependencies
var del = require('del');

// Task
module.exports = function (paths) {
    return function () {
        return del([paths.webroot.root + '**/*']);
    };
};
