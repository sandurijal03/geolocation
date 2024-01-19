import * as React from 'react'
import styled from 'styled-components'

import CloseImg from './close-img.svg'

type ChatboxProps = {
  socketId: number
  username: string
}

const Chatbox: React.FC<ChatboxProps> = ({ socketId, username }) => {
  const [message, setMessage] = React.useState<string>('')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && message.length > 0) {
      proceedChatMessage()
      setMessage("");
    }
  }

  const proceedChatMessage = () => {
    console.log('sending message to the receiver')
  }


  return (
    <ChatboxContainer>
      <ChatboxHeaderContainer>
        <Header>{username}</Header>
        <CloseIconContainer>
          <CloseImage src={CloseImg} />
        </CloseIconContainer>
      </ChatboxHeaderContainer>
      <ChatboxMessagesContainer>
        <MessageWrapper>
          <MessageLeft></MessageLeft>
          <MessageRight></MessageRight>
        </MessageWrapper>
        <ChatboxNewMessageContainer>
          <NewMessageInput
            type={'text'}
            placeholder='Enter Something'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={handleKeyDown}
          />
        </ChatboxNewMessageContainer>
      </ChatboxMessagesContainer>
    </ChatboxContainer>
  )
}

export default Chatbox

const ChatboxContainer = styled.div`
  height: 400px;
  width: 300px;
  background-color: white;
  margin-left: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  flex-direction: column;
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`

const ChatboxHeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: #049cff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Header = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: white;
`

const ChatboxMessagesContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
const ChatboxNewMessageContainer = styled.div`
  width: 100%;
  min-height: 40px;
  border-top: 1px solid #e5e5e5;
  position: absolute;
  bottom: 0;
  width: 46%;
`
const NewMessageInput = styled.input`
  width: calc(100% - 10px);
  height: 100%;
  border: none;
  outline: none;
  background: white;
  font-size: 14px;
`
const CloseIconContainer = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 5px;
`
const CloseImage = styled.img`
  width: 100%;
  height: 100%;
`

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
`

const MessageLeft = styled.div`
  display: inline-block;
  padding: 10px;
  margin: 5px 5px;
  border-radius: 25px;
  background: rgba(211, 211, 211, 0.9);
  font-size: 14px;
  max-width: 80%;
`
const MessageRight = styled.div`
  display: inline-block;
  padding: 10px;
  margin: 5px 5px;
  border-radius: 25px;
  background: rgba(39, 220, 197, 0.9);
  font-size: 14px;
  max-width: 80%;
`
