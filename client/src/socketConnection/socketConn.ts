import { io } from 'socket.io-client'
import { call } from '../realtimeCommunication/webRTCHandler'

import { LoginParameters } from '../store/actions/loginActions'
import { chatMessageHandler } from '../store/actions/messengerAction'
import {
  onlineUsersHandler,
  userDisconnectedHandler,
} from '../store/actions/userActions'
import { videoRoomsListHandler } from '../store/actions/videoRoomsAction'

let socket: any = null

export const connectWithSocketIOServer = () => {
  socket = io('http://localhost:5000')

  socket.on('connect', () => {
    console.log('connected to server')
  })

  socket.on('online-users', (usersData: any) => {
    onlineUsersHandler(socket.id, usersData)
  })

  socket.on('chat-message', (data: any) => {
    chatMessageHandler(data)
  })

  socket.on('video-rooms', (data: any) => {
    console.log('new video rooms received', data)
    videoRoomsListHandler(data)
  })

  socket.on('video-room-init', (data: any) => {
    call(data)
  })

  socket.on('user-disconnected', (disconnectedId: string) => {
    userDisconnectedHandler(disconnectedId)
  })
}

export const login = (data: LoginParameters) => {
  socket.emit('user-login', data)
}

export const sendChatMessage = (data: any) => {
  socket.emit('chat-message', data)
}

export const createVideoRoom = (data: any) => {
  socket.emit('video-room-create', data)
}

export const joinVideoRoom = (data: any) => {
  console.log('emitting event to join the room', data)
  socket.emit('video-room-join', data)
}

export const leaveVideoRoom = (data: any) => {
  socket.emit('video-room-leave', data)
}
