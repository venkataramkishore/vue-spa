const webpack = require('webpack')

const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')
const MFS = require('memory-fs')
const path = require('path')

module.exports = function setupDevServer (app, onUpdate) {
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ]

  const clientCompiler = webpack(clientConfig)

  app.use(
    require('webpack-dev-middleware')(clientCompiler, {
      stats: {
        color: true
      }
    })
  )
  app.use(require('webpack-hot-middleware')(clientCompiler))

  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, 'server/main.js')
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, () => {
    onUpdate(mfs.readFileSync(outputPath, 'utf-8'))
  })
}
