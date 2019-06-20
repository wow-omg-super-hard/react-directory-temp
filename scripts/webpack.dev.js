var merge = require('webpack-merge'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var util = require('./util'),
    config = require('../config'),
    baseConfig = require('./webpack.base');

var getPublicConfig = util.getOwnProperty(config.public),
    getDevConfig = util.getOwnProperty(config.dev);

module.exports = merge(baseConfig, {
    output: {
        publicPath: getDevConfig('assertPublicRoot')
    },

    module: {
        rules: [{
            // 引用非node_modules等第三方库CSS的时候，是需要进行Css Modules的
            test: /\.css/i,
            use: ExtractTextPlugin.extract(getPublicConfig('styleLoaders'), {
                modules: true,
                localIdentName: '[name]__[contenthash:base64:6]'
            }),
            exclude: /node_modules/
        }, {
            // 处理引用node_modules的直接用loader进行编译打包就行
            test: /\.css/i,
            use: ExtractTextPlugin.extract(getPublicConfig('styleLoaders')),
            include: /node_modules/
        }]
    },

    devtool: getDevConfig('devtool'),

    devServer: {
        host: getDevConfig('host'),
        port: getDevConfig('port'),
        contentBase: getDevConfig('contentBase'),
        open: getDevConfig('open'),
        historyApiFallback: getDevConfig('historyApiFallback'),
        proxy: getDevConfig('proxy')
    }
});