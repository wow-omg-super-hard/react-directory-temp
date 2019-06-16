var path = require('path');

export.getStyleLoaders = function (cssOptions) {
    var loaders = [
        'style-loader',
        {
            loader: 'css-loader',
            options: Object.assign({
                modules: true,
                localIdentName: '[name]__[contenthash:base64:6].css'
            }, cssOptions)
        }
    ];
};

export.getResolves = function (extensions, alias) {
    extensions = (extensions || []).concat([ '.js', '.json', '.css', '.less' ]);
    alias = Object.assign({ '@': path.resolve('..', 'src') }, alias || {});

    return {
        extensions: extensions,
        alias: alias
    };
}