import * as React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setCardChoosenOption } from '../../store/MapPage/mapSlice'

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
  const dispatch = useDispatch()

  const handleOptionChoose = () => {
    if (!myself) {
      dispatch(setCardChoosenOption({ socketId, username, coords }))
    }
  }

  return (
    <MarkerContainer onClick={handleOptionChoose}>
      <MarkerImg src={LocationIcon} alt={username} />
      <MarkerText>{myself ? 'Me' : username}</MarkerText>
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

const MarkerText = styled.p`
  font-size: 16px;
  color: white;
  font-weight: 700;
  position: absolute;
  margin: 0;
  padding: 0;
`
