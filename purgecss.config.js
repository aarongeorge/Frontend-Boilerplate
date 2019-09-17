module.exports = {
    'content': [
        './src/**/*.html',
        './src/**/*.ts'
    ],
    'defaultExtractor': content => content.match(/[\w-/:]+(?<!:)/g) || []
};
