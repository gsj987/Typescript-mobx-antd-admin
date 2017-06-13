const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { join, resolve } = require('path')
const root = process.cwd()

function resolveApp(relativePath) {
  return resolve(root, relativePath);
}

const paths = {
    appBuild: resolveApp('dist'),
    appPublic: resolveApp('dist'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    dllManifest: resolveApp('run/lib_manifest.json'),
    root
};

const pkg = require(paths.appPackageJson);

const webpackConfigBase = {
  entry: [
    'babel-polyfill',
    join(paths.appSrc, 'index')
  ],
  output: {
    path: paths.appBuild,
    publicPath: '',
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json', '.jsx' ],
    modules: [
      'node_modules',
      paths.appSrc
    ]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: ['react-hot-loader', 'awesome-typescript-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: `file-loader?name=style/[name]-[hash].[ext]`
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(paths.dllManifest),
      context: root,
    })
  ],
}


module.exports = {
  resolveApp,
  paths,
  pkg,
  webpackConfigBase,
}
