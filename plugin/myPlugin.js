class myPlugin {
    //处理源码

    //调用
    apply(compiler) {
        console.log("start")
        //注册订阅
        compiler.hooks.emit.tap("emit", function() {
            console.log("emit")
        })
        compiler.hooks.emit.tap("done", function() {
            console.log("done")
        })
    }
}

module.exports = myPlugin