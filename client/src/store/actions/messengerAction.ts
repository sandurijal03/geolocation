import { v4 } from 'uuid'
import { addChatMessage } from '../messenger/messengerSlice'
import store from '../store'

export const sendChatMessage = (receiverSocketId: string, content: string) => {
  const message = {
    content,
    receiverSocketId,
    id: v4(),
  }

  // socketConnection - to send the message to other user
  store.dispatch(
    addChatMessage({
      socketId: receiverSocketId,
      content,
      myMessage: true,
      id: message.id,
    }),
  )
}
