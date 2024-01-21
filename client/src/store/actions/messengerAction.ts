import { v4 } from 'uuid'
import { addChatMessage } from '../messenger/messengerSlice'
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
