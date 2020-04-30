/**
 * Tasks: Clean
 *
 * Cleans the webroot directory
 */

// Dependencies
import * as del from 'del'

// Task
module.exports = (paths: any) => () => del([`${paths.dist.root}/**/*`])
