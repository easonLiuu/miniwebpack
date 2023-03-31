let path = require("path")
let fs = require("fs")
//编译器
class Compiler {
    //config: webpack.config.js
    constructor(config) {
        this.config = config
        this.entryId //存储入口文件路径
        this.entry = config.entry
        //当前工作目录
        this.root = process.cwd()
        //用来保存所有模块依赖
        this.modules = {}
    }
    //读取模块内容
    getSource(modulePath) {
        return fs.readFileSync(modulePath, "utf-8")
    }
    //模块文件解析 source--文件内容 parentPath--文件目录
    //解析结果 - 是否存在子依赖包dependencies 解析的源码sourceCode
    parse(source, parentPath) {

    }
    //从root结点找所有的依赖模块
    //modulePath模块文件路径 isEntry是否是入口文件
    buildModule(modulePath, isEntry) {
        // console.log(modulePath) /Users/liujiarui/Desktop/miniwebpack/src/index.js
        let source = this.getSource(modulePath)
        // 拿到相对路径
        let moduleName = "./" + path.relative(this.root, modulePath)
        // console.log(moduleName) ./src/index.js
        if (isEntry) {
            this.entryId = moduleName //存储入口文件路径
        }
        //解析结果 - 是否存在子依赖包dependencies 解析的源码sourceCode
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName))
        // console.log(path.dirname(moduleName))   ./src
        // 保存解析的代码
        this.modules[moduleName] = sourceCode
        //递归
        dependencies.forEach(dep => {
            this.buildModule(path.join(this.root, dep), false)
        })
    }
    //执行方法 用于编译
    run() {
        this.buildModule(path.resolve(this.root, this.entry), true)
    }
}

module.exports = Compiler