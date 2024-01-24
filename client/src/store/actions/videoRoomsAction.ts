import { v4 } from 'uuid'
import store from '../store'
import { setInRoom, setRooms } from '../videoroom/videoroomSlice'

import * as socketConn from '../../socketConnection/socketConn'
import { getAccessToLocalStream, getPeerId } from '../../realtimeCommunication/webRTCHandler'

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

export const videoRoomsListHandler = (videoRooms: any) => {
  store.dispatch(setRooms(videoRooms))
}
