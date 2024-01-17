import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { calculateDistanceBetweenCoords } from '../../../utils/locationDistance'
import ActionButtons from './ActionButtons'

type UserInfoCardProps = {
  username: string
  userLocation: {
    lat:number;
    lng:number
  }
  socketId: string
}

type LabelProps = {
  text: string
  fontSize: string
}

const Label: React.FC<LabelProps> = ({ text, fontSize }) => {
  return <CardLabel style={{ fontSize }}>{text}</CardLabel>
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  username,
  userLocation,
  socketId,
}) => {
  const myLocation = useSelector((state: any) => state.map.myLocation)
  return (
    <CardWrapper>
      <Label text={username} fontSize='16px' />
      <Label
        text={`${calculateDistanceBetweenCoords(myLocation, userLocation)} km`}
        fontSize='14px'
      />
      <ActionButtons username={username} socketId={socketId} />
    </CardWrapper>
  )
}

export default UserInfoCard

const CardWrapper = styled.div`
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

const CardLabel = styled.label`
  margin: 10px 0 0 10px;
  padding: 0;
`
