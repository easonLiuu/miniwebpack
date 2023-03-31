#! /usr/bin/env node

// console.log('mnpack打包工具')
let path = require("path")
let config = require(path.resolve("webpack.config.js"))

//编译器
let Compiler = require("../lib/Compiler")
let compiler = new Compiler(config)

//开始编译
compiler.run()