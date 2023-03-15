import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    },
  },
})

export const { showNotification } = notificationReducer.actions
export default notificationReducer.reducer
