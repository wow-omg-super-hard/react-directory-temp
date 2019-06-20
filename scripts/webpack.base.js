var path = require('path');

var webpack = require('webpack'),
    HtmlPlugin = require('html-webpack-plugin'),
    CleanPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('../config'),
    util = require('./util');

var getDevConfig = util.getOwnProperty(config.dev),
    getPublicConfig = util.getOwnProperty(config.public);

module.exports = {
    entry: {
        bundle: path.join(getPublicConfig('entranceRoot'), getPublicConfig('entranceFilename')),
        // 因为基本不变，所以将第三方的库提取出来成一个entry chunk，打上hash，便于缓存
        third: util.getDepMods()
    },

    output: {
        path:getPublicConfig('assertRoot'),
        filename: getPublicConfig('assertFilename'),
        chunkFilename: getDevConfig('assertChunkFilename')
    },

    resolve: getPublicConfig('resolve'),

    module: {
        rules: [{
            test: /\.jsx?/i,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ 'env', 'react' ],
                    plugins: [ 'transform-object-rest-spread', 'transform-class-properties' ]
                }
            },
            exclude: /node_modules/i
        }, {
            test: /\.(jpe?g|gif|png|woff|svg|eot|ttf)/i,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 8192, // 小于8m的图片都转成base64
                    outputPath: path.join(getPublicConfig('assertStaticName'), '/'), // 打包的图片目录
                    name: '[name].[ext]' // 打包后的文件名，在css文件中或img.src中会根据output.publicPath或options.publicPath + name生成最终的文件名
                }
            }
        }]
    },

    plugins: [
        // 提取css到打包目录，参数是文件相对路径
        new ExtractTextPlugin(path.join(getPublicConfig('assertStaticName'), '[name].[contenthash].js')),

        // 抽取各个entry chunk中提取多次引用相同的模块，打包成common chunk
        // 其实这就是抽取业务代码的公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 如果值是存在的entry chunk或common chunk，则直接将代码打包进该chunk，否则直接以该值创建新的common chunk
            filename: '[name].[chunkhash].js' // filename是命名新的common chunk，如果省略就用name
            // chunks // 从规定的chunk集合中查找公共模块，默认从所有entry/common chunk中查找
            // minChunks // 如果值为number字面量，则表示引用达到次数就打包成common chunk，如果为Infinity，则创建的common entry不会打包进公共模块，而是打包runtime(webpack模块引用)，默认值是2
        }),
        // 将runtime代码从公共代码中抽取处理，因为runtime会变化，则会导致common chunk也会变化
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            filename: '[name].[chunkhash].js',
            chunks: [ 'common' ]
        }),

        // 创建引入所有chunk文件的html文件
        new HtmlPlugin({
            template: path.resolve('index.html'),
            inject: true,
            minify: {
                collapseWhitespace: true
            }      
        }),

        // 清除每次变化的chunk，比如runtime(common chunk)、 common(common chunk)、bundle(entry chunk)
        new CleanPlugin([ 
            path.resolve('..', 'bundle.*.js'),
            path.resolve('..', 'runtime.*.js'),
            path.resolve('..', 'common.*.js') 
        ], {
            verbose: true,
            dry: false
        }),

        // 热加载通过package.json的script中编写了，热替换后续加上
    ]
};