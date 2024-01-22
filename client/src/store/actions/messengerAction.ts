import { v4 } from 'uuid'
import { addChatbox, addChatMessage } from '../messenger/messengerSlice'
import store from '../store'

import * as socketConn from '../../socketConnection/socketConn'

export const sendChatMessage = (receiverSocketId: string, content: string) => {
  const message = {
    content,
    receiverSocketId,
    id: v4(),
  }

  // socketConnection - to send the message to other user

  socketConn.sendChatMessage(message)

  store.dispatch(
    addChatMessage({
      socketId: receiverSocketId,
      content,
      myMessage: true,
      id: message.id,
    }),
  )
}

export const chatMessageHandler = (messageData: any) => {
  store.dispatch(
    addChatMessage({
      socketId: messageData.senderSocketId,
      content: messageData.content,
      myMessage: false,
      id: messageData.id,
    }),
  )

  openChatBoxIfClosed(messageData.senderSocketId)
}

export const openChatBoxIfClosed = (socketId: string) => {
  const chatbox = store
    .getState()
    .messenger.chatboxes.find((chat) => chat.socketId === socketId)
  const username = store
    .getState()
    .map.onlineUsers.find((user) => user.socketId === socketId)?.username
  if (!chatbox) {
    store.dispatch(addChatbox({ socketId, username }))
  }
}
