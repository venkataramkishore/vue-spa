const base = require('./webpack.base.config')
const webpack = require('webpack')

const config = Object.assign({}, base, {
  plugins: (base.plugins || []).concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'assets/js/[name].js'
    })
  ])
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process-env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warning: false
      }
    })
  )
}
config.module.rules
  .filter(rule => rule.loader === 'vue-loader')
  .forEach(rule => {
    rule.options.extractCSS = true
  }
  )

module.exports = config
