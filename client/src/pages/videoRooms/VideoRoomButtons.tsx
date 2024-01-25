import * as React from 'react'
import styled from 'styled-components'
import LeaveBtn from './call-disconnect-icon.svg'
import CameraIcon from './camera-icon.svg'
import CameraOffIcon from './camera-off-icon.svg'
import MicOn from './mic-icon.svg'
import MicOffIcon from './mic-off-icon.svg'

const VideoRoomButtons = () => {
  const handleLeaveRoom = () => {}

  return (
    <VideoButtonsContainer>
      <VideoButton>A</VideoButton>
      <VideoButton onClick={handleLeaveRoom}>
        <img src={LeaveBtn} width='25px' height='25px' />
      </VideoButton>
      <VideoButton>B</VideoButton>
    </VideoButtonsContainer>
  )
}

export default VideoRoomButtons

const VideoButtonsContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0px;
  top: 10px;
`

const VideoButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: aqua;
  font-size: 16px;
  border: none;
  transition: 0.3s;

  :hover {
    opacity: 0.6;
  }
`
