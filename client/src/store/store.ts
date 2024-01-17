import { configureStore } from '@reduxjs/toolkit'

import mapReducer from './MapPage/mapSlice'
import messengerReducer from './messenger/messengerSlice'

const store = configureStore({
  reducer: {
    map: mapReducer,
    messenger: messengerReducer,
  },
})

export default store
