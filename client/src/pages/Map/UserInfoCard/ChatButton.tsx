import * as React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addChatbox } from '../../../store/messenger/messengerSlice'

import ChatIcon from '../chat-icon.svg'

type ChatButtonProps = {
  socketId: string
  username: string
}

const ChatButton: React.FC<ChatButtonProps> = ({ socketId, username }) => {
  const dispatch = useDispatch()

  const handleAddChatbox = () => {
    dispatch(
      addChatbox({
        username,
        socketId,
      }),
    )
  }
  return (
    <ChatButtonContainer
      onClick={handleAddChatbox}
      src={ChatIcon}
    ></ChatButtonContainer>
  )
}

export default ChatButton

const ChatButtonContainer = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 15px;
`
