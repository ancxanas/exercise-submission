import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

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

export const userLogin = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)

      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setLoggedUser(user))
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
    }
  }
}

export default loginSlice.reducer
