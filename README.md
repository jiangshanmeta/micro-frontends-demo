# 填坑指南

采用的是hash模式，前端库全部采用vue,构建到同一个目录下

## 父应用配置

父应用需要安装```qiankun```依赖。

```javascript
// 注册子应用
registerMicroApps([
    {
        // 子应用名称 推荐和子应用目录名称 以及子应用名称(package.json name字段)一致
        name: 'app1',
        // /micro-frontends-demo是pathname
        entry: isDev ? '//localhost:7000' : '/micro-frontends-demo/app1/index.html',
        // 挂载点id
        container: '#main',
        activeRule (location) {
            // 判断路由 hash模式的
            return location.hash.slice(1).startsWith('/app1');
        },
    },
    {
        name: 'app2',
        entry: isDev ? '//localhost:7001' : '/micro-frontends-demo/app2/index.html',
        container: '#main',
        activeRule (location) {
            return location.hash.slice(1).startsWith('/app2');
        },
    },
]);
// 启用qiankun
start();
```

## 子应用配置

### vue.config.js

```javascript
// 子应用名称
const { name } = require('./package');
// 这个开发时的端口号要自己分配 有点讨厌
const port = 7000;

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    // 每个子应用构建到自己独立的目录下
    outputDir: isDev?'./dist':'../dist/micro-frontends-demo/app2',
    // 写上pathname
    publicPath: isDev?'./':'/micro-frontends-demo/app2/',
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
```

### package.json

```javascript
{
    "serve": "vue-cli-service serve",
    // 因为是打包在一起，所以上一个应用的output不能被删除 所以要添加--no-clean
    "build": "vue-cli-service build --no-clean",
    "lint": "vue-cli-service lint"
},
```

### public-path.js

```javascript
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

放在和```main.js```同级目录下，而且要在```main.js```开始就引用

### main.js

```javascript
let router = null;
let instance = null;
// 实例化子应用
function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app1' : '/',
    mode: 'hash',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
// 下面三个函数是给父应用用的
export async function bootstrap() {

}

export async function mount(props) {

  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
```

## 构建配置

由于一些原因现在父子应用都构建在一起，而且子应用构建时会删除index.html文件，所以要把父应用的构建放在最后

```javascript
const rimraf = require('rimraf');
const runAll = require("npm-run-all");

rimraf('dist', ()=>{
    // 注意主应用构建目录层级 更高一层 主应用构建时不能删除
    runAll([
        'build:app1',
        'build:app2',
        'build:main',
    ])
})
```

对应的package.json

```javascript
{
    // 上面的构建脚本
    "build": "node scripts/build.js",
    // 构建应用
    "build:main": "cd main && npm run build",
    "build:app1": "cd app1 && npm run build",
    "build:app2": "cd app2 && npm run build"
}
```
