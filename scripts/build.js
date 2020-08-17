const rimraf = require('rimraf');
const runAll = require("npm-run-all");

rimraf('dist', ()=>{
    runAll([
        'build:app1',
        'build:app2',
        'build:main',
    ])
})