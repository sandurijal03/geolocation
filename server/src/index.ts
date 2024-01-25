import http from 'http'

import express, { Request, Response } from 'express'
import cors from 'cors'
import { Server, Socket } from 'socket.io'
import { PeerServer } from 'peer'

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

    socket.on('video-room-join', (data: any) => {
      videoRoomJoinHandler(socket, data)
    })

    socket.on('video-room-leave', (data: any) => {
      videoRoomLeaveHandler(socket, data)
    })

    socket.on('disconnect', () => {
      disconnectEventHandler(socket.id)
    })
  })

  const peerServer = PeerServer({ port: 9000, path: '/peer' })

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

const videoRoomJoinHandler = (socket: Socket, data: any) => {
  const { roomId, peerId } = data

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants.forEach((participant: any) => {
      socket.to(participant.socketId).emit('video-room-init', {
        newParticipantPeerId: peerId,
      })
    })

    videoRooms[roomId].participants = [
      ...videoRooms[roomId].participants,
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ]

    broadcastVideoRooms()
  }
}

const videoRoomLeaveHandler = (socket: Socket, data: any) => {
  const { roomId } = data

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
      (participant: any) => participant.socketId === socket.id,
    )
  }

  if (videoRooms[roomId].participants.length > 0) {
    // emit an event to the user which is in the room that he should also close his peer connection
    socket
      .to(videoRooms[roomId].participants[0].socketId)
      .emit('video-call-disconnect')
  }

  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId]
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
