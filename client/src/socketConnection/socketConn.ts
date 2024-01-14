import { io } from 'socket.io-client'

import { LoginParameters } from '../store/actions/loginActions'
import { onlineUsersHandler } from '../store/actions/userActions'

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
}

export const login = (data: LoginParameters) => {
  socket.emit('user-login', data)
}
