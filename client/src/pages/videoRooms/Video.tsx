import * as React from 'react'
import styled from 'styled-components'

type VideoProps = {
  stream: any
  muted: boolean
}

const Video: React.FC<VideoProps> = ({ stream, muted }) => {
  const videoEl: any = React.useRef()

  React.useEffect(() => {
    const video = videoEl.current
    video.srcObject = stream

    video.onloadedmetadata = () => {
      video.play()
    }
  }, [stream])
  return (
    <VideoContainer>
      <video
        width={'98%'}
        height={'98%'}
        playsInline
        autoPlay
        muted={muted}
        ref={videoEl}
      />
    </VideoContainer>
  )
}

export default Video

const VideoContainer = styled.div`
  height: 200px;
  width: 250px;
  background-color: black;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
