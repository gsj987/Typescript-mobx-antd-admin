const webpack = require('webpack')
const config = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const DllConfig = require('../run/lib_assets.json')
const { assign } = Object
const { join } = require('path')
const root = process.cwd()
const front = join(root, 'src')
const pkg = require(join(root, 'package.json'))


config.devtool = "eval-source-map";

config.output = assign(config.output, {
  filename: 'bundle/[name].js',
  chunkFilename: "bundle/[name].module.js"
})

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.css$/,
    loader: ['style-loader', 'css-loader']
  },
  {
    test: /\.less$/,
    exclude: /node_modules/,
    loader: ['style-loader', 'typings-for-css-modules-loader?module&namedExport&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:8]', 'less-loader' ]
  },
  {
    test: /\.less$/,
    include: /node_modules/,
    exclude: front,
    loader: ['style-loader', 'typings-for-css-modules-loader?namedExport&camelCase&importLoaders=1', `less-loader?{modifyVars:${JSON.stringify(pkg.config.antd.theme)}}` ]
  }
])

config.plugins.push(
  new HtmlwebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    inject: 'body',
    dllName: DllConfig.lib.js
  }),
  new webpack.HotModuleReplacementPlugin()
)

module.exports = config
