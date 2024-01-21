import { io } from 'socket.io-client'

import { LoginParameters } from '../store/actions/loginActions'
import {
  onlineUsersHandler,
  userDisconnectedHandler,
} from '../store/actions/userActions'

let socket: any = null

export const connectWithSocketIOServer = () => {
  socket = io('http://localhost:5000')

  socket.on('connect', () => {
    console.log('connected to server')
  })

  socket.on('online-users', (usersData: any) => {
    console.log(usersData)
    onlineUsersHandler(socket.id, usersData)
  })

  socket.on('chat-message', (data: any) => {
    console.log('message received client', data);
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
