import { setOnlineUsers , removeDisconnectedUser} from '../MapPage/mapSlice'
import store from '../store'

export const onlineUsersHandler = (socketId: string, usersData: any) => {
  store.dispatch(
    setOnlineUsers(
      usersData.map((user:any) => {
        if (user.socketId === socketId) {
          user.myself = true
        }
        return user
      }),
    ),
  )
}

export const userDisconnectedHandler = (disconnectedSocketId:string) => {
 store.dispatch(
    removeDisconnectedUser(disconnectedSocketId)
  ) 
}
