  
#! /bin/bash

rm -rf dist
mkdir dist

cp -r public/loader dist
cp public/index.html dist
cp public/login.html dist

webpack --config webpack-dist.config.js