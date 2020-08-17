const { name } = require('./package');
const port = 7000;

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    outputDir: isDev?'./dist':'../dist/micro-frontends-demo/app1',
    publicPath: isDev?'./':'/micro-frontends-demo/app1/',
    lintOnSave: false,
    indexPath:`index.html`,
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
