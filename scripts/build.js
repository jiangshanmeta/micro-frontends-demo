const rimraf = require('rimraf');
const runAll = require("npm-run-all");

rimraf('dist', ()=>{
    // 还有点问题 必须要把主应用放在最后
    // 子应用独立构建后目前会自动删除index.html
    runAll([
        'build:app1',
        'build:app2',
        'build:main',
    ])
})