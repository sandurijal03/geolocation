import { Peer } from 'peerjs'

let peer: any
let peerId: string = ''

import store from '../store/store'
import {
  setLocalStream,
  setRemoteStream,
} from '../store/videoroom/videoroomSlice'

export const getPeerId = () => {
  return peerId.length && peerId
}

export const getAccessToLocalStream = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    // if no camera set video to false
    video: true,
    audio: true,
  })

  if (localStream) {
    store.dispatch(setLocalStream(localStream))
  }

  return Boolean(localStream)
}

export const connectWithPeerServer = () => {
  peer = new Peer('', {
    host: 'localhost',
    port: 9000,
    path: '/peer',
  })

  peer.on('open', (id: string) => {
    peerId = id
  })

  peer.on('call', async (call: any) => {
    const localStream = store.getState().videoRoom.localStream

    call.answer(localStream && localStream) // answe the call with audio video stream
    call.on('stream', (remoteStream: any) => {
      store.dispatch(setRemoteStream(remoteStream))
    })
  })
}

export const call = (data: any) => {
  const { newParticipantPeerId } = data

  const localStream = store.getState().videoRoom.localStream

  const peerCall = peer.call(newParticipantPeerId, localStream)

  peerCall.on('stream', (remoteStream: any) => {
    store.dispatch(setRemoteStream(remoteStream))
  })
}

export const disconnect = () => {
  // close all peer connections

  for (let conn in peer.connections) {
    peer.connections[conn].forEach((con: any) => {
      con.peerConnection.close()

      if (con.close) con.close()
    })
  }

  store.dispatch(setRemoteStream(null))
}
