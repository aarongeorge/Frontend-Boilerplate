/**
 * Tasks: Clean
 *
 * Cleans the webroot directory
 */

// Dependencies
const del = require('del')

// Task
module.exports = paths => () => del([`${paths.dist.root}/**/*`])
