require('babel-register')
require('babel-polyfill')
var path =  require('path')

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
  .server(path.join(__dirname, '../../'))
  .then(() => {
    require('./onlineIndex')
  })