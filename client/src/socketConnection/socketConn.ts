import { io } from 'socket.io-client'

import { LoginParameters } from '../store/actions/loginActions'

let socket: any = null

export const connectWithSocketIOServer = () => {
  socket = io('http://localhost:5000')

  socket.on('connect', () => {
    console.log('connected to server')
  })
}

export const login = (data:LoginParameters) => {
  socket.emit("user-login", data)
}
