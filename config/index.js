var path = require('path');
var util = require('./util');

function getRoot () {
    var args = Array.prototype.concat.apply([], arguments);

    return path.resolve.apply(path, args);
}

module.exports = {
    public: {
        // 入口
        entranceRoot: getRoot('src'),
        entranceFilename: 'entrance.js',

        // Path
        assertRoot: getRoot('dist'),    // 打包的目录
        assertFilename: '[name].[chunkhash].js', // 打包的资源文件名
        assertStaticName: 'statics', // 打包的css、font、image后的目录
        assertChunkFilename: '[name].[chunkhash].js', // 生成的children chunk，通过Code Split产生的chunk

        // Resolve
        resolve: util.getResolves, // 默认后缀名，设置开发根目录快捷方式，方便开发时引用

        // Style Loader
        styleLoaders: util.getStyleLoaders // 生成css loaders
    },

    dev: {
        assertPublicRoot: '/', // 替换css的图片引用和img src的基础路径
        devtool: '#cheap-module-eval-source-map',

        // Server
        host: 'localhost', // 生成的本地服务器域名
        port: 7878,
        contentBase: getRoot('dist'), // 服务器根目录 
        open: true, // 构建完成是否自动打开浏览器
        historyApiFallback: true, // 访问应用不存在的路径，自动跳到首页，配合BrowserHistory使用
        proxy: { // 代理跨域请求
            '/api': 'http://localhost:3000'
        }
    },

    prod: {
        // 一般用cdn
        assertPublicRoot: '/',
        devtool: '#cheap-module-source-map',
    }
};
