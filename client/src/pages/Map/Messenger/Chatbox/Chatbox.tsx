import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { sendChatMessage } from '../../../../store/actions/messengerAction'

import { removeChatbox } from '../../../../store/messenger/messengerSlice'

import CloseImg from './close-img.svg'

type ChatboxProps = {
  socketId: string
  username: string
}

type SingleMessageProps = {
  content: string
  myMessage: boolean
}

type Message = {
  content: string
}

const LeftMessage: React.FC<Message> = ({ content }) => {
  return <MessageRight>{content}</MessageRight>
}

const RightMessage: React.FC<Message> = ({ content }) => {
  return <MessageLeft>{content}</MessageLeft>
}

const SingleMessage: React.FC<SingleMessageProps> = ({
  content,
  myMessage,
}) => {
  return (
    <MessageWrapper
      style={
        myMessage
          ? { justifyContent: 'flex-end' }
          : { justifyContent: 'flex-start' }
      }
    >
      {myMessage ? (
        <RightMessage content={content} />
      ) : (
        <LeftMessage content={content} />
      )}
    </MessageWrapper>
  )
}

const Chatbox: React.FC<ChatboxProps> = ({ socketId, username }) => {
  const [message, setMessage] = React.useState<string>('')
  const [inputDisabled, setInputDisabled] = React.useState(false)

  const messages = useSelector(
    (state: any) => state.messenger.chatHistory[socketId],
  )

  const onlineUsers = useSelector((state: any) => state.map.onlineUsers)

  const dispatch = useDispatch()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && message.length > 0) {
      proceedChatMessage()
      setMessage('')
    }
  }

  const proceedChatMessage = () => {
    console.log('sending message to the receiver')
    if (onlineUsers.find((user:any) => user.socketId === socketId)) {
      sendChatMessage(socketId, message)
    } else {
      setInputDisabled(true)
    }
  }

  const handleCloseChatbox = () => {
    dispatch(removeChatbox(socketId))
  }

  return (
    <ChatboxContainer>
      <ChatboxHeaderContainer>
        <Header>{username}</Header>
        <CloseIconContainer>
          <CloseImage src={CloseImg} onClick={handleCloseChatbox} />
        </CloseIconContainer>
      </ChatboxHeaderContainer>
      <ChatboxMessagesContainer>
        {messages?.map((message: any) => {
          return (
            <SingleMessage
              key={message.id}
              content={message.content}
              myMessage={message.myMessage}
            />
          )
        })}
      </ChatboxMessagesContainer>
      <ChatboxNewMessageContainer>
        <NewMessageInput
          type={'text'}
          placeholder='Enter Something'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={handleKeyDown}
          disabled={inputDisabled}
        />
      </ChatboxNewMessageContainer>
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
  /* flex-direction:column; */
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
