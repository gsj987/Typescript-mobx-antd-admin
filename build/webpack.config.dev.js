const webpack = require('webpack')
const config = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const DllConfig = require('../run/lib_assets.json')
const { assign } = Object
const path = require('path')

config.devtool = "source-map";

config.output = assign(config.output, {
  filename: 'bundle/[name].js',
  chunkFilename: "bundle/[name].module.js"
})

config.plugins.push(
  new ExtractTextPlugin('style/[name].css'),
  new HtmlwebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    inject: 'body',
    dllName: DllConfig.lib.js
  }),
  new webpack.HotModuleReplacementPlugin()
)

module.exports = config
