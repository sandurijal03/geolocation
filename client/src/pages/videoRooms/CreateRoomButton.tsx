import * as React from 'react'
import styled from 'styled-components'

import { createVideoRoom } from '../../store/actions/videoRoomsAction'

import CallIcon from './call-icon.svg'

const CreateRoomButton = () => {
  const handleRoomCreate = () => {
    createVideoRoom()
  }
  return <CallImg src={CallIcon} alt='call icon' onClick={handleRoomCreate} />
}

export default CreateRoomButton

const CallImg = styled.img`
  width: 40px;
  height: 40px;
`
