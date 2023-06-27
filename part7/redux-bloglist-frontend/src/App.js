import React, { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/Login/LoginForm'
import Notification from './components/Notification/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import Menu from './components/NavBar/Menu'
import './App.css'

const App = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
    dispatch(getLoggedUser())
  }, [])

  useEffect(() => {
    if (user) blogService.setToken(user.token)
  }, [user])

  return (
    <div>
      {!user && (
        <div>
          <div className="notification-container">
            <Notification />
          </div>

          <div>
            <div className="login-form-container">
              <LoginForm />
            </div>
          </div>
        </div>
      )}
      {user && <Menu />}
    </div>
  )
}

export default App
