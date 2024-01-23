import { configureStore } from '@reduxjs/toolkit'

import mapReducer from './MapPage/mapSlice'
import messengerReducer from './messenger/messengerSlice'
import videoroomsReducer from './videoroom/videoroomSlice'

const store = configureStore({
  reducer: {
    map: mapReducer,
    messenger: messengerReducer,
    videoRoom: videoroomsReducer,
  },
})

export default store
