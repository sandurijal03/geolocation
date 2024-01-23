import { v4 } from 'uuid'
import store from '../store'
import { setInRoom, setRooms } from '../videoroom/videoroomSlice'

import * as socketConn from '../../socketConnection/socketConn'

export const createVideoRoom = async () => {
  // get access to local stream
  const newRoomId = v4()

  store.dispatch(setInRoom(newRoomId))

  socketConn.createVideoRoom({
    peerId: 1, // change later on for later peerId
    newRoomId,
  })
}

export const videoRoomsListHandler = (videoRooms) => {
  store.dispatch(setRooms(videoRooms))
}
