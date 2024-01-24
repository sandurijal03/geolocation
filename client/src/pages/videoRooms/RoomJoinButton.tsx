import * as React from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux'
import { joinVideoRoom } from '../../store/actions/videoRoomsAction'

type RoomJoinButtonProps = {
  creatorUsername: string
  roomId: string
  amountOfParticipants: number
}

const RoomJoinButton: React.FC<RoomJoinButtonProps> = ({
  creatorUsername,
  roomId,
  amountOfParticipants,
}) => {
  const inRoom = useSelector((state) => state.videoRoom.inRoom)

  const handleJoinRoom = () => {
    if (inRoom) {
      return alert('already in room')
    }

    if (amountOfParticipants > 1) {
      return alert('room is full')
    }

    joinVideoRoom(roomId)
  }
  return <RoomJoinBtn onClick={handleJoinRoom}>{creatorUsername[0]}</RoomJoinBtn>
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
