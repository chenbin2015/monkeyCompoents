var webpack = require('webpack')
var path = require('path')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration')).development()

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?http://localhost:3001/__webpack_hmr',
    'react-hot-loader/patch',
    'webpack/hot/dev-server',
    './index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: ['babel-loader']
    }, {
      test: /\.scss$/,
      loader: [
        'style-loader',
        'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]_[hash:base64:5]',
        'sass-loader?sourceMap'
      ].join('!')
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url-loader?limit=10240'
    }]
  },
  plugins: [
    webpackIsomorphicToolsPlugin,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
