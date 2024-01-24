import { Peer } from 'peerjs'

let peer
let peerId: string = '';

import store from '../store/store'
import { setLocalStream } from '../store/videoroom/videoroomSlice'

export const getPeerId = () => {
  return peerId.length && peerId;
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

  peer.on('open', (id) => {
    console.log('peer id', id)
    peerId = id;
  })
}
