import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inRoom: null, // if user will be in room - here we will be saving room id
  rooms: [],
  localStream: null,
  remoteStream: null,
}

export const videoroomSlice = createSlice({
  name: 'videoRooms',
  initialState,
  reducers: {
    setInRoom: (state, action) => {
      state.inRoom = action.payload
    },
    setRooms: (state, action) => {
      state.rooms = action.payload
    },
    setLocalStream: (state, action) => {
      state.localStream = action.payload
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload
    },
  },
})

export const { setInRoom, setRooms, setLocalStream, setRemoteStream } =
  videoroomSlice.actions

export default videoroomSlice.reducer
