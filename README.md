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

## 03 查找所有的依赖模块

- 读取代码内容
- 读取模块文件相对路径
- 读取模块文件中子依赖包，首先需要解析当前模块
- 解析结果：
  - 是否存在子依赖包dependencies
  - 解析的源码sourceCode
  - 代码解析： vue->html、css、js      es6->es5

## 04 模块解析

- 使用AST语法树解析
- 如const n = 1 -> const x = 1
- 将代码中的require 变成` __webpack_require__`
- 将require("./xxx") 补全require("./xxx.js") 
- 收集dependencies

## 05 打包输出

- 使用模版生成my.js，传入的参数必须是动态的
- 模版express ejs <%=xxx%>
- 使用fs将生成的文件写入bundle.js，使用index.html引入打开测试与之前webpack打包输出一致

## 06 loader

- less sass vue...
- 作用：转化，less->css、vue->js、html、css
- 使用nix webpack打包less
- 使用自定义loader less-loader style-loader
- 打包时使用自定义loader

## 07 plugin