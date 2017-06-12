const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { join } = require('path')
const root = process.cwd()
const front = join(root, 'src')
const dist = join(root, 'dist')
const pkg = require(join(root, 'package.json'))


module.exports = {
  entry: [
    join(front, 'index')
  ],
  output: {
    path: dist,
    publicPath: '',
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
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: `file-loader?name=style/[name]-[hash].[ext]`
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('../run/lib_manifest.json'),
      context: root,
    })
  ],
}
