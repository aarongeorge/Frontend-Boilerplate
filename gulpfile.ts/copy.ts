/**
 * Tasks: Copy
 *
 * Copies all static files to the webroot
 */

// Task
module.exports = (gulp: any, paths: any) => () => gulp.src([
    `${paths.src.font}/**/*`,
    `${paths.src.image}/**/*`,
    `${paths.src.root}/{*.ico}`
],
{base: paths.src.root})
    .pipe(gulp.dest(paths.dist.root))
