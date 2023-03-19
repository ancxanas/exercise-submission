import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    setLoggedUser(state, action) {
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(action.payload)
      )
    },
    getLoggedUser() {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        return JSON.parse(loggedUserJSON)
      }
    },
  },
})

export const { setUser, setLoggedUser, getLoggedUser } = loginSlice.actions

export default loginSlice.reducer
