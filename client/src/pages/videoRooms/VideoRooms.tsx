import * as React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import CallIcon from './call-icon.svg'

const CreateRoomButton = () => {
  return <CallImg src={CallIcon} alt='call icon' onClick={() => {}} />
}

const CallImg = styled.img`
  width: 40px;
  height: 40px;
`

const RoomsList = () => {
  const rooms = useSelector((state: any) => state.videoRoom.rooms)
  return (
    <div>
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
