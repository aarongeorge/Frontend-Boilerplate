module.exports = {
	theme: {
		extend: {
			colors: {primary: '#411B19'},
			borderColor: theme => ({default: theme('colors.primary')})
		},
		fontFamily: {
			display: ['Vulf Mono', 'sans-serif'],
			body: ['Vulf Sans', 'sans-serif']
		},
		borderStyles: {
			colors: true,
			styles: true
		}
	},
	variants: [
		'active',
		'disabled',
		'even',
		'first',
		'focus-within',
		'focus',
		'group-hover',
		'hover',
		'last',
		'odd',
		'responsive',
		'visited'
	]
}
