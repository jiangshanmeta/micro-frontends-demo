const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    lintOnSave: false,
    outputDir: '../dist/micro-frontends-demo/',
    // assetsDir: 'main',
    filenameHashing: true,
    publicPath: './',
};
