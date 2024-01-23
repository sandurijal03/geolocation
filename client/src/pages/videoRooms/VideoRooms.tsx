import * as React from 'react'
import styled from 'styled-components'

import ParticipantsVideos from './Participant'
import RoomsList from './RoomList'

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
