# 手写miniwebpack


## 01 webpack如何工作

- 如何执行打包命令，如npx webpack

- 打包完输出到dist目录，通过html文件引入并在浏览器上运行

- npx可以执行node_modules目录下的包

- npm init -y 自动生成一个package.json依赖包管理文件

- 分析打包生成的文件bundle.js的结构

- 实现：执行xx命令，从webpack.config.js打包项目并生成bundle.js结构的文件

- 分析bundle.js文件

  - 文件结构：(fun(modules){处理模块加载})(indexfile: fun, demo: fun)

  - 将"./demo"引入文件路径补全，转换后是"./demo.js"

  - 将require替换成webpack自定义加载函数`__webpack_require__`

## 02 创建打包命令 mnpack

- 创建命令的目录

- 生成package.json

- 生成命令， npm link 把本地目录创建全局快捷方式

- npx mnpack 先全局找 再本地找