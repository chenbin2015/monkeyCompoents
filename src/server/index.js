require('babel-register')
require('babel-polyfill')

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
  .server('./')
  .then(() => {
    require('./app')
  })