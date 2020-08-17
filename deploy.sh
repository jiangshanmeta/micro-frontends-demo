#!/usr/bin/env sh
set -e

npm run build
cd dist/micro-frontends-demo

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:jiangshanmeta/micro-frontends-demo.git master:gh-pages