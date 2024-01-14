import { createSlice } from '@reduxjs/toolkit'

type MyLocation = {
  lat: number
  lng: number
}

type InitialState = {
  myLocation: MyLocation
  onlineUsers: any
  cardChosenOption: any
}

const initialState: InitialState = {
  myLocation: {
    lat: 0,
    lng: 0,
  },
  onlineUsers: [],
  cardChosenOption: null,
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMyLocation: (state: InitialState, action: any): any => {
      state.myLocation = action.payload
    },
    setOnlineUsers: (state: InitialState, action: any) => {
      state.onlineUsers = action.payload
    },
    removeDisconnectedUser: (state: InitialState, action: any) => {
      state.onlineUsers = state.onlineUsers.filter(
        (user: any) => user.socketId !== action.payload,
      )
    },
  },
})

export const { setMyLocation, setOnlineUsers, removeDisconnectedUser } = mapSlice.actions

export default mapSlice.reducer
