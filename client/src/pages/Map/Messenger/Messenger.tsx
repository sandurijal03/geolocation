import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import Chatbox from './Chatbox/Chatbox'

// const DUMMY_CHATBOXES = [
//   {
//     username: 'Martin',
//     socketId: 3213213,
//     messages: [],
//   },
//   {
//     username: 'Test',
//     socketId: 3213213,
//     messages: [],
//   },
// ]

type ChatboxType = {
  socketId:string;
  username:string
}

const Messenger = () => {
  const chatboxes = useSelector((state: any) => state.messenger.chatboxes)
  return (
    <MessengerContainer>
      {chatboxes.map((chatbox:ChatboxType, index: number) => {
        return (
          <Chatbox
            key={index}
            socketId={chatbox.socketId}
            username={chatbox.username}
          />
        )
      })}
    </MessengerContainer>
  )
}

export default Messenger

const MessengerContainer = styled.div`
  height: 400px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
`
