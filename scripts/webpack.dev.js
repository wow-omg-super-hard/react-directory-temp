var path = require('path');
var webpack = require('webpack');
var config = require('../config');

function getOwnProperty = function (obj) {
    return function (prop) {
        if (obj.hasOwnProperty(prop)) {
            return typeof obj[ prop ] === 'function'
                ? obj[ prop ].call(obj, obj)
                : obj[ prop ];
        }
    };
}

var getPublicConfig = getOwnProperty(config.public),
    getDevConfig = getOwnProperty(config.dev),
    getProdConfig = getOwnProperty(config.prod);

module.exports = {
    entry: {
        bundle: path.join(getPublicConfig('entranceRoot'), getPublicConfig('entranceFilename'))
    },

    output: {
        path:getPublicConfig('assertRoot'),
        filename: getPublicConfig('assertFilename'),
        publicPath: getDevConfig('assertPublicRoot'),
        chunkFilename: getDevConfig('assertChunkFilename')
    },

    devtool: getDevConfig('devtool'),

    resolve: getPublicConfig('resolve')

    devServer: {
        host: getDevConfig('host')
        port: getDevConfig('port'),
        contentBase: getDevConfig('contentBase'),
        open: getDevConfig('open'),
        historyApiFallback: getDevConfig('historyApiFallback'),
        proxy: getDevConfig('proxy')
    },

    module: {
        rules: [{
            test: /\.jsx?/i,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ 'env', 'react' ],
                    plugins: [ 'transform-object-rest-spread', 'transform-class-properties' ]
                }
            }
        }, {
            test: /\.(jpe?g|gif|png)/i,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 8192, //小于8m的图片都转成base65
                    name: path.join(getPublicConfig('assertStaticRoot'), '[name].js'), // 生成图片的路径
                }
            }
        }, {
            test: /\.css/i,
            use: getPublicConfig('styleLoaders')
        }]
    }

};