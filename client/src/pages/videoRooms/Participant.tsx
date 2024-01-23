import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Video from './Video'


const ParticipantsVideos = () => {
  const inRoom = useSelector((state) => state.videoRoom.inRoom)
  const localStream = useSelector((state) => state.videoRoom.localStream)

  return (
    <ParticipantsVideosContainer>
      {inRoom && localStream && <Video stream={localStream} muted />}
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
