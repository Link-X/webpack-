const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const entry = process.env.npm_lifecycle_event === 'start' ? ['webpack-hot-middleware/client.js?reload=true', './src/index.js'] : './src/index.js'

function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = {
    entry: {
        main: entry
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.js$/, // 用 babel-loader 解析js
            loader: 'babel-loader',
            include: [resolve('src')]
        }]
    },
    plugins: [
        new UglifyPlugin(), // 压缩文件
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            minify: { // 压缩 HTML 的配置
                minifyJS: true // 压缩 HTML 中出现的 JS 代码
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: [".wasm", ".mjs", ".js", ".json"], // 查找文件顺序
        alias: {
            "@": path.resolve(__dirname, 'src') // 路径别名,以后导入模块，前面加一个@就是当如src下的xxx
        }
    }
}