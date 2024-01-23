import * as React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import CallIcon from './call-icon.svg'
import { createVideoRoom } from '../../store/actions/videoRoomsAction'
import Video from './Video'

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

const convertRoomsToArray = (videoRooms: any) => {
  const rooms: any = []

  Object.entries(videoRooms).forEach(([key, value]) => {
    rooms.push({
      id: key,
      creatorUsername: value.participants[0].username,
      amount: value.participants.length,
    })
  })
  return rooms
}

const RoomsList = () => {
  const rooms = useSelector((state: any) => state.videoRoom.rooms)

  return (
    <div>
      {convertRoomsToArray(rooms).map((room: any) => (
        <RoomJoinButton
          key={room.id}
          creatorUsername={room.creatorUsername}
          roomId={room.id}
          amountOfParticipants={room.amountOfParticipants}
        />
      ))}

      <CreateRoomButton />
    </div>
  )
}

const ParticipantsVideos = () => {
  const inRoom = useSelector((state) => state.videoRoom.inRoom)
  const localStream = useSelector((state) => state.videoRoom.localStream)

  return (
    <ParticipantsVideosContainer>
      {inRoom && localStream && <Video stream={localStream} muted />}
    </ParticipantsVideosContainer>
  )
}

const ParticipantsVideosContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  right: 10px;
  bottom: 150px;
  width: 250px;
  align-items: flex-end;
`

const VideoRooms = () => {
  return (
    <Container>
      <RoomsList />
      <ParticipantsVideos />
    </Container>
  )
}

export default VideoRooms

const Container = styled.div`
  position: absolute;
  bottom: 35px;
  right: 60px;
`
