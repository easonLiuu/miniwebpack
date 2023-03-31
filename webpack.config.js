let path = require("path")

module.exports = {
    mode: "development", //开发模式
    entry: "./src/index.js", //打包入口
    output: { //打包输出目录
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
}