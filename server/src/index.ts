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

var io: any

const mountServer = () => {
  const app = express()
  const server = http.createServer(app)

  app.use(cors())

  app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
  })
  io = new Server(server, {
    allowEIO3: true,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket: any) => {
    console.log('user connected of the id: ' + socket.id)

    socket.on('user-login', (data: UserData) => loginEventHandler(socket, data))

    socket.on('chat-message', (data) => chatMessageHandler(socket, data))

    socket.on('disconnect', () => {
      disconnectEventHandler(socket.id)
    })
  })

  const port = process.env.PORT || 5000
  server.listen(port, () => {
    console.log(`server running on port: ${port}`)
  })
}

const broadcastDisconnectedUserDetails = (
  disconnectedUsersSocketId: string,
) => {
  io.to('logged-users').emit('user-disconnected', disconnectedUsersSocketId)
}

const disconnectEventHandler = (id: string) => {
  console.log(`user disconnected of the id : ${id}`)
  removeOnlineUser(id)
  broadcastDisconnectedUserDetails(id)
}

type UserData = {
  username: string
  coords: {
    lat: number
    lng: number
  }
}

const loginEventHandler = (socket: Socket, data: UserData) => {
  socket.join('logged-users')

  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  }

  io.to('logged-users').emit('online-users', convertOnlineUsersToArray())
}

type OnlineUsersCol = {
  socketId: string
  username: string
  coords: {
    lat: number
    lng: number
  }
}

const convertOnlineUsersToArray = () => {
  const onlineUsersArray: OnlineUsersCol[] = []

  Object.entries(onlineUsers).forEach(([key, value]) => {
    onlineUsersArray.push({
      socketId: key,
      username: value.username,
      coords: value.coords,
    })
  })

  return onlineUsersArray
}

const chatMessageHandler = (socket: any, data: any) => {
  const { receiverSocketId, content, id } = data
  if (onlineUsers[receiverSocketId]) {
    console.log('message received', data);
    console.log('sending message to other user');
    io.to(receiverSocketId).emit('chat-message', {
      senderSocketId: socket.id,
      content,
      id,
    })
  }
}

const removeOnlineUser = (socketId: string) => {
  if (onlineUsers[socketId]) {
    delete onlineUsers[socketId]
  }
}

mountServer()
