var webpack = require('webpack')
var path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: {
  	main: './index.js',
  	vendor:['react',
      'react-redux',
      'react-router',
      'redux',
      'lodash',
      'isomorphic-fetch',
      'history',
      'prop-types',
      'seamless-immutable']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../../dist'),
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
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      }
    }),
    new ExtractTextPlugin("app.css")
  ]
}