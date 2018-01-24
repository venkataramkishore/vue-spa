const base = require('./webpack.base.config')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const config = Object.assign({}, base, {
  plugins: base.plugins || [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextWebpackPlugin('assets/css/styles.css')
  ]
})

config.module.rules
  .filter(rule => rule.loader === 'vue-loader')
  .forEach(rule => {
    rule.options.extractCSS = true
  }
  )

module.exports = config
