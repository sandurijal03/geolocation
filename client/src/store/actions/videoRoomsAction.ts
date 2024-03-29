import { v4 } from 'uuid'
import store from '../store'
import { setInRoom, setRooms } from '../videoroom/videoroomSlice'

import * as socketConn from '../../socketConnection/socketConn'
import {
    disconnect,
  getAccessToLocalStream,
  getPeerId,
} from '../../realtimeCommunication/webRTCHandler'

export const createVideoRoom = async () => {
  // get access to local stream

  const success = await getAccessToLocalStream()

  if (success) {
    const newRoomId = v4()

    store.dispatch(setInRoom(newRoomId))

    socketConn.createVideoRoom({
      peerId: getPeerId(), // change later on for later peerId
      newRoomId,
    })
  }
}

export const joinVideoRoom = async (roomId: string) => {
  const success = await getAccessToLocalStream()

  if (success) {
    store.dispatch(setInRoom(roomId))

    socketConn.joinVideoRoom({ roomId, peerId: getPeerId() })
  }
}

export const videoRoomsListHandler = (videoRooms: any) => {
  store.dispatch(setRooms(videoRooms))
}

export const leaveVideoRoom = (roomId:string) => {
  disconnect()
  socketConn.leaveVideoRoom({roomId})

  store.dispatch(setInRoom(false))
}
