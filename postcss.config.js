const config = {
    'plugins': {
        'postcss-import': {},
        'tailwindcss': './tailwind.config.js'
    }
};

if (process.env.NODE_ENV === 'production') {
    config.plugins['@fullhuman/postcss-purgecss'] = {};
}

module.exports = config;
