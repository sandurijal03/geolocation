import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { leaveVideoRoom } from '../../store/actions/videoRoomsAction'
import { setIsCameraOn, setIsMicOn } from '../../store/videoroom/videoroomSlice'
import LeaveBtn from './call-disconnect-icon.svg'
import CameraIcon from './camera-icon.svg'
import CameraOffIcon from './camera-off-icon.svg'
import MicOn from './mic-icon.svg'
import MicOffIcon from './mic-off-icon.svg'

type VideoRoomButtonsProps = {
  inRoom: string
}

const VideoRoomButtons: React.FC<VideoRoomButtonsProps> = ({ inRoom }) => {
  const isMicOn = useSelector((state: any) => state.videoRoom.isMicOn)
  const isCameraOn = useSelector((state: any) => state.videoRoom.isCameraOn)

  const dispatch = useDispatch()

  const handleLeaveRoom = () => {
    leaveVideoRoom(inRoom)
  }

  const handleMuteToggle = () => {
    dispatch(setIsMicOn(!isMicOn))
  }
  const handleCameraToggle = () => {
    dispatch(setIsCameraOn(!isCameraOn))
  }

  return (
    <VideoButtonsContainer>
      <VideoButton onClick={handleMuteToggle}>
        {<img src={isMicOn ? MicOn : MicOffIcon} width='25px' height='25px' />}
      </VideoButton>
      <VideoButton onClick={handleLeaveRoom}>
        <img src={LeaveBtn} width='25px' height='25px' />
      </VideoButton>
      <VideoButton onClick={handleCameraToggle}>
        {
          <img
            src={isCameraOn ? CameraIcon : CameraOffIcon}
            width='25px'
            height='25px'
          />
        }
      </VideoButton>
    </VideoButtonsContainer>
  )
}

export default VideoRoomButtons

const VideoButtonsContainer = styled.div`
  display: flex;
  position: absolute;
  right: 40px;
  /* top: 10px; */
  bottom: -50px;
`

const VideoButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: aqua;
  font-size: 16px;
  border: none;
  transition: 0.3s;
  margin: 0px 10px;

  :hover {
    opacity: 0.6;
  }
`
