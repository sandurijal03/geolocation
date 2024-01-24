import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { createVideoRoom } from '../../store/actions/videoRoomsAction'

import CallIcon from './call-icon.svg'

const CreateRoomButton = () => {
  const inRoom = useSelector((state) => state.videoRoom.inRoom)

  const handleRoomCreate = () => {
    if (inRoom) {
      return alert('You are already in the room')
    }

    createVideoRoom()
  }
  return <CallImg src={CallIcon} alt='call icon' onClick={handleRoomCreate} />
}

export default CreateRoomButton

const CallImg = styled.img`
  width: 40px;
  height: 40px;
`
