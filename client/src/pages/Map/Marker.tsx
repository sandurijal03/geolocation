import * as React from 'react'
import styled from 'styled-components'

import LocationIcon from './location-icon.svg'

type MarkerProps = {
  lat?: number
  lng?: number
  myself?: boolean
  socketId: string
  username: string
  coords: {
    lng: number
    lat: number
  }
}

const Marker: React.FC<MarkerProps> = ({
  myself,
  socketId,
  username,
  coords,
}) => {
  return (
    <MarkerContainer>
      <MarkerImg src={LocationIcon} alt={username} />
    </MarkerContainer>
  )
}

export default Marker

const MarkerContainer = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
`

const MarkerImg = styled.img`
  width: 100%;
  height: 100%;
  transition: 0.3s;
  cursor: pointer;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`