module.exports = api => {
    api.cache(true)

    const plugins = []
    const presets = [[
        '@babel/preset-env',
        {
            corejs: '3.0.0',
            useBuiltIns: 'entry'
        }
    ]]

    return {
        plugins,
        presets
    }
}
