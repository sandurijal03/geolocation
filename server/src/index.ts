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
let videoRooms: any = {}

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

    socket.on('user-login', (data: UserData) => loginEventHandler(socket, data))

    socket.on('chat-message', (data: any) => chatMessageHandler(socket, data))

    socket.on('video-room-create', (data: any) =>
      videoRoomCreateHandler(socket, data),
    )

    socket.on('disconnect', () => {
      disconnectEventHandler(socket.id)
    })
  })

  const port = process.env.PORT || 5000
  server.listen(port, () => {
    console.log(`server running on port: ${port}`)
  })
}

mountServer()

const disconnectEventHandler = (id: string) => {
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

const chatMessageHandler = (socket: any, data: any) => {
  const { receiverSocketId, content, id } = data
  if (onlineUsers[receiverSocketId]) {
    io.to(receiverSocketId).emit('chat-message', {
      senderSocketId: socket.id,
      content,
      id,
    })
  }
}

const videoRoomCreateHandler = (socket: Socket, data: any) => {
  const { peerId, newRoomId } = data
  videoRooms[newRoomId] = {
    participants: [
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ],
  }

  broadcastVideoRooms()
}

// helpers

type OnlineUsersCol = {
  socketId: string
  username: string
  coords: {
    lat: number
    lng: number
  }
}

const removeOnlineUser = (socketId: string) => {
  if (onlineUsers[socketId]) {
    delete onlineUsers[socketId]
  }
}

const broadcastDisconnectedUserDetails = (
  disconnectedUsersSocketId: string,
) => {
  io.to('logged-users').emit('user-disconnected', disconnectedUsersSocketId)
}

const broadcastVideoRooms = () => {
  io.emit('video-rooms', videoRooms)
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
