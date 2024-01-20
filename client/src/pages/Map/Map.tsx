import * as React from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import Marker from './Marker'
import { OnlineUser } from '../../store/MapPage/mapSlice'
import UserInfoCard from './UserInfoCard/UserInfoCard'
import Messenger from './Messenger/Messenger'

const Map = () => {
  const myLocation = useSelector((state: any) => state.map.myLocation)
  const onlineUsers = useSelector((state: any) => state.map.onlineUsers)
  const cardChoosenOption = useSelector(
    (state: any) => state.map.cardChosenOption,
  )

  const defaultMapProps = {
    center: {
      lat: myLocation.lat,
      lng: myLocation.lng,
    },
    zoom: 11,
  }

  return (
    <Wrapper>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAcLD6V_5w9PE5SSQzcMR4DZreKS_NRjK8' }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
      >
        {onlineUsers.map((onlineUser: OnlineUser) => {
          return (
            <Marker
              lat={onlineUser.coords.lat}
              lng={onlineUser.coords.lng}
              coords={onlineUser.coords}
              myself={onlineUser.myself}
              socketId={onlineUser.socketId}
              key={onlineUser.socketId}
              username={onlineUser.username}
            />
          )
        })}
      </GoogleMapReact>
      <Messenger />
      {cardChoosenOption && cardChoosenOption.socketId && (
        <UserInfoCard
          socketId={cardChoosenOption.socketId}
          username={cardChoosenOption.username}
          userLocation={cardChoosenOption.coords}
        />
      )}
    </Wrapper>
  )
}

export default Map

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`

const Card = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 4px;
  width: 300px;
  height: 100px;
  display: flex;
  flex-direction: column;

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

const CardImg = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 15px;
  transition: 0.3s;

  :hover {
    opacity: 0.6;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0px;
  top: 10px;
`

const CardSeparator = styled.div`
  height: 100%;
  width: 2px;
  background-color: black;
  border-radius: 8px;
`

const JoinButton = styled.button`
  width: 45px;
  height: 45px;
  margin-right: 15px;
  border-radius: 45px;
  background-color: #00ffff;
  font-size: 24px;
  border: none;
  transition: 0.3s;

  :hover {
    opacity: 0.6;
  }

  :active {
    background-color: black;
  }
`

const RoomVideosContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  right: 10px;
  bottom: 150px;
  width: 250px;
  align-items: flex-end;
`

const RoomVideoContainer = styled.div`
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

const RoomButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
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
