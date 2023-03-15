import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { showNotification, clearNotification } =
  notificationReducer.actions

export const setNotification = (notification) => {
  return (dispatch) => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationReducer.reducer
