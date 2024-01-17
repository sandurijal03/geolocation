import * as React from 'react'
import styled from 'styled-components'
import ChatButton from './ChatButton'

type ActionButtonsProps = {
  username: string
  socketId: string
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  username,
  socketId,
}) => {
  return (
    <ButtonContainer>
      <ChatButton socketId={socketId} username={username} />
    </ButtonContainer>
  )
}

export default ActionButtons

const ButtonContainer = styled.button`
  display: flex;
  position: absolute;
  right: 0px;
  top: 10px;
`
