/**
* Tasks: Compile Scripts
*
* Bundles JS
* Transpiles es6 to es2015
* Writes sourcemaps
*/

// Dependencies
const rollup = require('rollup')
const typescript = require('@rollup/plugin-typescript')

module.exports = ({paths, environment}) => async () => {
	
	const bundle = await rollup.rollup({input: `${paths.src.script}/index.ts`, plugins: [typescript()]})
	
	await bundle.write({
		file: `${paths.dist.script}/index.js`,
		format: 'iife',
		sourcemap: environment !== 'prod'
	})
}