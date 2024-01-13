import http from 'http'

import express, { Request, Response } from 'express'
import cors from 'cors'
import { Server, Socket } from 'socket.io'

type OnlineUsers = {
  [id: string]: {
    username: string
    coords: {
      lat: number
      lng: number
    }
  }
}

let onlineUsers: OnlineUsers = {}

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

    socket.on('user-login', (data: UserData) => loginEventHandler(socket, data))

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
  removeOnlineUser(id)
}

type UserData = {
  username: string
  coords: {
    lat: number
    lng: number
  }
}

const loginEventHandler = (socket: Socket, data: UserData) => {
  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  }
  console.log('users', onlineUsers);
}

const removeOnlineUser = (socketId: string) => {
  if (onlineUsers[socketId]) {
    delete onlineUsers[socketId]
  }
  console.log('onlineUsers', onlineUsers);
}

mountServer()
