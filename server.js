const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const serialize = require('serialize-javascript')
const { createBundleRenderer } = require('vue-server-renderer')
let renderer

const port = process.env.port || 3000

// index file
const IndexFile = (() => {
  return fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
})()

//  setup dev server for hot reload and watch
require('./build/dev-server')(app, bundle => {
  renderer = createBundleRenderer(bundle)
})

// load static content
app.use('.dist', express.static(path.resolve(__dirname, './dist')))

app.get('*', (req, res) => {
  const context = {url: req.url}
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    html = IndexFile.replace('{{ vueSPAApp }}', html)
    html = html.replace('{{ STATE }}',
      `<script>window._INITIAL_STATE_=${serialize(context.initialState, {isJSON: true})}</script>`)
    res.write(html)
    res.end()
  })
})

app.listen(port, () => {
  console.log(`server listening to http://localhost:${port}`)
})
