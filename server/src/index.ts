import http from 'http'

import express, { Request, Response } from 'express'
import cors from 'cors'
import { Server } from 'socket.io'

const mountServer = () => {
  const app = express()
  const server = http.createServer(app)

  app.use(cors())

  app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
  })
  const io = new Server(server, {
    allowEIO3: true,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket: any) => {
    console.log('user connected of the id: ' + socket.id)

    socket.on('disconnect', () => {
      disconnectEventHandler(socket.id)
    })
  })

  const port = process.env.PORT || 5000
  server.listen(port, () => {
    console.log(`server running on port: ${port}`)
  })
}

const disconnectEventHandler = (id: string) => {
  console.log(`user disconnected of the id : ${id}`)
}

mountServer()
