const webpack = require('webpack')
const config = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DllConfig = require('../run/lib_assets.json')
const { assign } = Object
const path = require('path')

config.output = assign(config.output, {
  filename: 'bundle/[name].[hash:8].js',
  chunkFilename: "bundle/[name].module.[hash:8].js"
})

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new ExtractTextPlugin('style/[name].[hash:8].css'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    minimize: true,
    output: {
      comments: false
    }
  }),
  new HtmlwebpackPlugin({
    filename: 'dist/index.html',
    template: 'src/index.html',
    inject: 'body',
    dllName: DLLConfig.lib.js,
    minify: true
  })
)

module.exports = config
