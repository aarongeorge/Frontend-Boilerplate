/**
* Gulpfile
*/

// Dependencies
const gulp = require('gulp')
const browserSync = require('browser-sync')

const bs = browserSync.create()

// Set the default environment
let environment = 'local'

// Paths
const paths = {
	src: {
		font: './src/font',
		html: './src/html',
		image: './src/image',
		root: './src',
		script: './src/script',
		style: './src/style'
	},
	dist: {
		font: './dist/font',
		html: './dist/html',
		image: './dist/image',
		root: './dist',
		script: './dist/script',
		style: './dist/style'
	}
}

// Environment variables
const environmentVariables = {
	local: [
		{replaceString: '{{envPath}}', value: ''},
		{replaceString: '{{cacheBuster}}', value: Number(new Date())}
	],
	dev: [
		{replaceString: '{{envPath}}', value: ''},
		{replaceString: '{{cacheBuster}}', value: Number(new Date())}
	],
	qa: [
		{replaceString: '{{envPath}}', value: '' },
		{replaceString: '{{cacheBuster}}', value: Number(new Date())}
	],
	uat: [
		{replaceString: '{{envPath}}', value: ''},
		{replaceString: '{{cacheBuster}}', value: Number(new Date())}
	],
	prod: [
		{replaceString: '{{envPath}}', value: ''},
		{replaceString: '{{cacheBuster}}', value: Number(new Date())}
	]
}

for (const env of Object.keys(environmentVariables)) {
	if (process.argv.indexOf(`--${env}`) > -1) {
		environment = env
		break
	}
}

// Tasks
gulp.task('clean', require('./clean')(paths))
gulp.task('copy', require('./copy')({gulp, paths}))
gulp.task('compile-scripts', require('./compile-scripts')({gulp, paths, environment}))
gulp.task('compile-styles', require('./compile-styles')({gulp, paths, environment}))
gulp.task('compile-templates', require('./compile-templates')({gulp, paths}))
gulp.task('replace-environment-variables', require('./replace-environment-variables')({gulp, paths, environment, environmentVariables}))
gulp.task('server', require('./server')({paths, bs}))
gulp.task('watch', require('./watch')({gulp, paths, bs}))

// Default
gulp.task('default',
gulp.series('clean', 'copy',
gulp.parallel('compile-templates', 'compile-scripts', 'compile-styles'),
gulp.parallel('replace-environment-variables'),
gulp.parallel('server', 'watch')))

// Build
gulp.task('build',
gulp.series('clean', 'copy',
gulp.parallel('compile-templates', 'compile-scripts', 'compile-styles'),
gulp.parallel('replace-environment-variables')))