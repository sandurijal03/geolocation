import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  myLocation: any
  onlineUsers: any
  cardChosenOption: any
}

const initialState: InitialState = {
  myLocation: null,
  onlineUsers: [],
  cardChosenOption: null,
}

export const mapSlice = createSlice({
  name: 'Map',
  initialState,
  reducers: {
    setMyLocation: (state: InitialState, action: any) => {
      state.myLocation = action.payload
    },
  },
})

export const { setMyLocation } = mapSlice.actions

export default mapSlice.reducer
