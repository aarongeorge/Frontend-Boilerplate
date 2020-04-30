module.exports = {
    theme: {
        extend: {
            colors: {primary: '#411B19'},
            borderColor: theme => ({default: theme('colors.primary')})
        },
        fontFamily: {
            display: [
                'Vulf Mono',
                'sans-serif'
            ],
            body: [
                'Vulf Sans',
                'sans-serif'
            ]
        },
        borderStyles: {
            colors: true,
            styles: true
        }
    },
    variants: [
        'responsive',
        'group-hover',
        'focus-within',
        'first',
        'last',
        'odd',
        'even',
        'hover',
        'focus',
        'active',
        'visited',
        'disabled'
    ]
}
