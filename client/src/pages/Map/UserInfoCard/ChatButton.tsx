import * as React from 'react'
import styled from 'styled-components'

import ChatIcon from '../chat-icon.svg'

type ChatButtonProps = {
  socketId: string
  username: string
}

const ChatButton: React.FC<ChatButtonProps> = ({ socketId, username }) => {
  const handleAddChatbox = () => {}
  return (
    <ChatButtonContainer
      onClick={handleAddChatbox}
      src={ChatIcon}
    ></ChatButtonContainer>
  )
}

export default ChatButton

const ChatButtonContainer = styled.img``
