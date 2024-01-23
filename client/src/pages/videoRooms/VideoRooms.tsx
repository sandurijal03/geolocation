import * as React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import CallIcon from './call-icon.svg'
import { createVideoRoom } from '../../store/actions/videoRoomsAction'

const CreateRoomButton = () => {
  const handleRoomCreate = () => {
    createVideoRoom()
  }
  return <CallImg src={CallIcon} alt='call icon' onClick={handleRoomCreate} />
}

const CallImg = styled.img`
  width: 40px;
  height: 40px;
`

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

const DUMMY_ROOMS = [
  {
    id: 1,
    participants: [
      {
        socketId: 1,
        peerId: 1,
        username: 'Martin',
      },
    ],
  },
  {
    id: 2,
    participants: [
      {
        socketId: 2,
        peerId: 2,
        username: 'John',
      },
    ],
  },
]

const RoomsList = () => {
  const rooms = useSelector((state: any) => state.videoRoom.rooms)
  return (
    <div>
      {DUMMY_ROOMS.map((room) => (
        <RoomJoinButton
          key={room.id}
          creatorUsername={room.participants[0].username}
          roomId={room.id}
          amountOfParticipants={room.participants.length}
        />
      ))}

      <CreateRoomButton />
    </div>
  )
}

const VideoRooms = () => {
  return (
    <Container>
      <RoomsList />
    </Container>
  )
}

export default VideoRooms

const Container = styled.div`
  position: absolute;
  bottom: 35px;
  right: 60px;
`
