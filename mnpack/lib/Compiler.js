let path = require("path")
let fs = require("fs")
let babylon = require("babylon")
let types = require("@babel/types")
let traverse = require("@babel/traverse").default
let generator = require("@babel/generator").default
//babylon @babel/traverse @babel/types @babel/generator
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
        // const code = "const n = 1"
        const ast = babylon.parse(source)
        let dependencies = [] //存储子模块依赖
        traverse(ast, {
            CallExpression(p) {
                let node = p.node
                if (node.callee.name === "require") {
                    node.callee.name = "__webpack_require__"
                    let moduleName = node.arguments[0].value
                    moduleName = moduleName + (path.extname(moduleName) ? "" : ".js") //xxx.js
                    // 收集dependencies 注意拿到的是相对路径 比如./src/xxx.js
                    // console.log('111',path.join(parentPath, moduleName))
                    moduleName = "./" + path.join(parentPath, moduleName)
                    dependencies.push(moduleName) // 存储子模块依赖
                    // 将更新后的子模块依赖名写回去
                    node.arguments = [types.stringLiteral(moduleName)]
                }
            }
            // enter(path) {
            //     if (path.isIdentifier({name: 'n'})) {
            //         console.log(path.node)
            //         path.node.name = "x"
            //     }
            // }
        })
        let sourceCode = generator(ast).code
        console.log(sourceCode)
        return { sourceCode, dependencies }
    }
    //从root结点找所有的依赖模块
    //modulePath模块文件路径 isEntry是否是入口文件
    buildModule(modulePath, isEntry) {
        // console.log(modulePath) // /Users/liujiarui/Desktop/miniwebpack/src/index.js
        let source = this.getSource(modulePath)
        // 拿到相对路径
        let moduleName = "./" + path.relative(this.root, modulePath)
        // console.log(moduleName) ./src/index.js
        if (isEntry) {
            this.entryId = moduleName //存储入口文件路径
        }
        //解析结果 - 是否存在子依赖包dependencies 解析的源码sourceCode
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName))
        // console.log(path.dirname(moduleName))   //   ./src
        // 保存解析的代码
        this.modules[moduleName] = sourceCode
        // 递归
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