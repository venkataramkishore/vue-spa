const base = require('./webpack.base.config')
let config = Object.assign({}, base, {})

// no need of app entry for unit tests
delete config.entry

module.exports = config
