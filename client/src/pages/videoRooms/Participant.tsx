import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Video from './Video'
import VideoRoomButtons from './VideoRoomButtons'

const ParticipantsVideos = () => {
  const inRoom = useSelector((state: any) => state.videoRoom.inRoom)
  const localStream = useSelector((state: any) => state.videoRoom.localStream)
  const remoteStream = useSelector((state: any) => state.videoRoom.remoteStream)

  console.log('localStream', localStream)
  console.log('remoteStream', remoteStream)

  return (
    <ParticipantsVideosContainer>
      {inRoom && <VideoRoomButtons />}
      {inRoom && localStream && <Video stream={localStream} muted />}
      {inRoom && remoteStream && <Video stream={remoteStream} muted />}
    </ParticipantsVideosContainer>
  )
}

export default ParticipantsVideos

const ParticipantsVideosContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  right: 10px;
  bottom: 150px;
  width: 250px;
  align-items: flex-end;
`
