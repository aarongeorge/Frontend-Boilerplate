module.exports = api => {
    api.cache(true);

    const presets = [
        '@vue/babel-preset-jsx',
        [
            '@babel/preset-env',
            {
                'targets': {
                    'browsers': [
                        'last 2 versions',
                        'ie >= 8'
                    ]
                }
            }
        ]
    ];

    const plugins = ['@babel/plugin-proposal-export-default-from'];

    return {
        plugins,
        presets
    };
};
