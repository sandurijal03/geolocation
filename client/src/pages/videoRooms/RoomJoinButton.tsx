import * as React from 'react'
import styled from 'styled-components'

type RoomJoinButtonProps = {
  creatorUsername: string
  roomId: number | string
  amountOfParticipants: number
}

const RoomJoinButton: React.FC<RoomJoinButtonProps> = ({
  creatorUsername,
  roomId,
  amountOfParticipants,
}) => {
  const handleJoinRoom = () => {}
  return <RoomJoinBtn>{creatorUsername[0]}</RoomJoinBtn>
}

export default RoomJoinButton

const RoomJoinBtn = styled.button`
  width: 45px;
  height: 45px;
  margin-right: 15px;
  border-radius: 45px;
  background-color: #00ffff;
  font-size: 24px;
  border: none;
  transition: 0.3s;

  :hover {
    opacity: 0.6;
  }

  :active {
    background-color: #000;
  }
`



