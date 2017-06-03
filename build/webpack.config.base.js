const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { join } = require('path')
const root = process.cwd()
const front = join(root, 'src')
const dist = join(root, 'dist')
const pkg = require(join(root, 'package.json'))

const entry = name => {
  return join(front, 'routers', name, 'index')
}

module.exports = {
  entry: {
    index: join(front, 'index')
  },
  output: {
    path: dist,
    publicPath: 'dist',
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json', '.jsx' ],
    modules: [
      'node_modules',
      front
    ]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: ['react-hot-loader', 'awesome-typescript-loader']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract([ 'typings-for-css-modules-loader?modules&namedExport&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:8]', 'postcss-loader' ])
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract([ 'typings-for-css-modules-loader', `less-loader?{modifyVars:${JSON.stringify(pkg.config.antd.theme)}}` ])
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/,
      options: {
        postcss: [
          require('postcss-nested')
        ]
      }
    }),
    new webpack.DllReferencePlugin({
      manifest: require('../run/lib_manifest.json'),
      context: root,
    })
  ],
}
