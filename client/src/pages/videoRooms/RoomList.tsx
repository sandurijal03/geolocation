import * as React from 'react'
import { useSelector } from 'react-redux'
import CreateRoomButton from './CreateRoomButton'

import RoomJoinButton from './RoomJoinButton'

const convertRoomsToArray = (videoRooms: any) => {
  const rooms: any = []

  Object.entries(videoRooms).forEach(([key, value]) => {
    rooms.push({
      id: key,
      creatorUsername: value.participants[0].username,
      amount: value.participants.length,
    })
  })
  return rooms
}

const RoomsList = () => {
  const rooms = useSelector((state: any) => state.videoRoom.rooms)

  return (
    <div>
      {convertRoomsToArray(rooms).map((room: any) => (
        <RoomJoinButton
          key={room.id}
          creatorUsername={room.creatorUsername}
          roomId={room.id}
          amountOfParticipants={room.amountOfParticipants}
        />
      ))}

      <CreateRoomButton />
    </div>
  )
}

export default RoomsList
