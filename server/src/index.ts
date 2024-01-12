import http from 'http'

import express from 'express'
import cors from 'cors'

const mountServer = () => {
  const app = express()
  const server = http.createServer(app)

  app.use(cors())

  const port = process.env.PORT || 5000
  server.listen(port, () => {
    console.log(`server running on port: ${port}`)
  })
}

mountServer()
