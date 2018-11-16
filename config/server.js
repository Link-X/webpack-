const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require("webpack-hot-middleware")
const webpackOptions = require('../webpack.config.js')
const path = require('path')

webpackOptions.mode = 'development'
const compiler = webpack(webpackOptions),
  express = require('express'),
  app = express(),
  DIST_DIR = path.join(__dirname, '..', 'dist')

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackOptions.output.publicPath,
  quiet: true
})
const hotMiddleware = webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000
})


app.use(devMiddleware)
app.use(hotMiddleware)

app.listen(3000, () => console.log('http://localhost:3000'))