const port = 7002;
const { name } = require('./package');
const isDev = process.env.NODE_ENV === 'development'


module.exports = {
  lintOnSave: false,
    // 每个子应用构建到自己独立的目录下
    outputDir: isDev?'./dist':'../dist/micro-frontends-demo/vue3app',
    // 写上pathname
    publicPath: isDev?'./':'/micro-frontends-demo/vue3app/',
    lintOnSave: false,
    // 和name保持一致
    indexPath:`index.html`,
    devServer: {
        hot: true,
        disableHostCheck: true,
        port,
        overlay: {
            warnings: false,
            errors: true,
        },
        // 开发时跨域
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
