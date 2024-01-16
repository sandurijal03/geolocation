import { createSlice } from '@reduxjs/toolkit'

type MyLocation = {
  lat: number
  lng: number
}

export type InitialState = {
  myLocation: MyLocation
  onlineUsers: OnlineUser[]
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

export type OnlineUser = {
  socketId: string
  username: string
  coords: MyLocation
  myself?: boolean
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
        (user) => user.socketId !== action.payload,
      )
    },
    setCardChoosenOption: (state: InitialState, action: any) => {
      state.cardChosenOption = action.payload
    },
  },
})

export const {
  setMyLocation,
  setOnlineUsers,
  removeDisconnectedUser,
  setCardChoosenOption,
} = mapSlice.actions

export default mapSlice.reducer
