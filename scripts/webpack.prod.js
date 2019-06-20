var path = require('path');

var webpack = require('webpack'),
    merge = require('webpack-merge'),
    HtmlPlugin = require('html-webpack-plugin'),
    CleanPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('../config'),
    util = require('./util'),
    baseConfig = require('./webpack.base');

var getProdConfig = util.getOwnProperty(config.prod);

module.exports = merge(baseConfig, {
    output: {
        publicPath: getProdConfig('assertPublicRoot')
    },

    devtool: getProdConfig('devtool'),

    module: {
        rules: [{
            // 引用非node_modules等第三方库CSS的时候，是需要进行Css Modules的
            test: /\.css/i,
            use: ExtractTextPlugin.extract(getPublicConfig('styleLoaders'), {
                modules: true,
                localIdentName: '[name]__[contenthash:base64:6]',
                minimize: true // 对css进行打包
            }),
            exclude: /node_modules/
        }, {
            // 处理引用node_modules的直接用loader进行编译打包就行
            test: /\.css/,
            use: ExtractTextPlugin.extract(getPublicConfig('styleLoaders'), {
                minimize: true
            }),
            include: /node_modules/
        }]
    },

    plugins: [
        // 压缩打包后的chunk
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warning: false
            }
        })
    ]
});

