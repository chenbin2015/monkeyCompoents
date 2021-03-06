var webpack = require('webpack')
var path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: ['./index.js'],
    vendor: ['react',
      'react-redux',
      'react-router',
      'redux',
      'lodash',
      'isomorphic-fetch',
      'webpack-hot-middleware/client?http://localhost:3001/__webpack_hmr',
      'react-hot-loader/patch',
      'webpack/hot/dev-server',
      'react-addons-perf',
      'react-hot-loader',
      'history',
      'babel-register',
      'babel-polyfill'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/'
  },
  module: {
    rules: [{
        test: /.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader?modules&importLoaders=2&minimize&sourceMap&localIdentName=[local]_[hash:base64:5]", "sass-loader"]
        })
      },
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: [
          path.join(process.cwd(), './src')
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2
    }),
    new ExtractTextPlugin("app.css")
  ]
}