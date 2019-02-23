const express = require('express')
const next = require('next')

const compression = require('compression')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
let port = dev ? 4324 : 80

const getProductsList = require('./data')

console.log('Waiting ready on http://localhost ' + port + ' ……')

// Pass in the absolute path to your robots.txt file
app.prepare()
  .then(() => {
    const server = express()

    if (!dev) {
      server.use(compression()) //gzip
    }

    server.get('*', (req, res) => {
      return handle(req, res)
    })
    server.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost ' + port)
    })

  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
