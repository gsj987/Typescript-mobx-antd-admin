const webpack = require('webpack')
const { webpackConfigBase, paths, pkg } = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const DLLConfig = require('../run/lib_assets.json')
const { assign } = Object


const config = webpackConfigBase

config.output = assign(config.output, {
  filename: 'bundle/[name].[hash:8].js',
  chunkFilename: "bundle/[name].module.[hash:8].js"
})

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader']
    })
  },
  {
    test: /\.less$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['typings-for-css-modules-loader?module&namedExport&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:8]', 'less-loader' ]
    })
  },
  {
    test: /\.less$/,
    include: /node_modules/,
    exclude: paths.appSrc,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader?importLoaders=1', `less-loader?{modifyVars:${JSON.stringify(pkg.config.antd.theme)}}` ]
    })
  }
])

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
    filename: 'index.html',
    template: 'src/index.html',
    inject: 'body',
    dllName: DLLConfig.lib.js,
    minify:
    {
      removeAttributeQuotes: true
    }
  })
)

module.exports = config
