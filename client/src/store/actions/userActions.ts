import {
  setOnlineUsers,
  removeDisconnectedUser,
  OnlineUser,
} from '../MapPage/mapSlice'
import store from '../store'

export const onlineUsersHandler = (socketId: string, usersData: any) => {
  store.dispatch(
    setOnlineUsers(
      usersData.map((user: OnlineUser) => {
        if (user.socketId === socketId) {
          user.myself = true
        }
        return user
      }),
    ),
  )
}

export const userDisconnectedHandler = (disconnectedSocketId: string) => {
  store.dispatch(removeDisconnectedUser(disconnectedSocketId))
}
