var path = require('path');

exports.getStyleLoaders = function (cssOptions) {
    var loader = {
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: cssOptions
        }]
    };

    return loader;
};

exports.getResolves = function (extensions, alias) {
    extensions = (extensions || []).concat([ '.js', '.json', '.css', '.less' ]);
    alias = Object.assign({ '@': path.resolve('..', 'src') }, alias || {});

    return {
        extensions: extensions,
        alias: alias
    };
}