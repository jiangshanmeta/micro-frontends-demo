const { name } = require('./package');
const port = 7001;
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    outputDir: isDev?'./dist':'../dist',
    publicPath: './',
    indexPath:`${name}.html`,
    lintOnSave: false,
    devServer: {
        hot: true,
        disableHostCheck: true,
        port,
        overlay: {
            warnings: false,
            errors: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    configureWebpack: {
        output: {
            // 把子应用打包成 umd 库格式
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`,
        },
    },
}
