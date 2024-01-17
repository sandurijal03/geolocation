import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  chatboxes: { socketId: string }[]
  chatHistory: Object
}

const initialState: InitialState = {
  chatboxes: [],
  chatHistory: {},
}

export const messengerSlice = createSlice({
  name: 'messenger',
  initialState,
  reducers: {
    addChatboxes: (state, action) => {
      if (
        !state.chatboxes.find(
          (chatbox) => chatbox.socketId === action.payload.socketId,
        )
      ) {
        state.chatboxes.push(action.payload)
      }
    },
    removeChatbox: (state, action) => {
      state.chatboxes = state.chatboxes.filter(
        (chatbox) => chatbox.socketId !== action.payload,
      )
    },
  },
})

const { addChatboxes, removeChatbox } = messengerSlice.actions

export default messengerSlice.reducer
