import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedUser, userLogout } from './reducers/loginReducer'
import UsersList from './components/UsersList'
import { initializeUsers } from './reducers/userReducer'

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

  const blogFormRef = useRef()

  return (
    <>
      {!user && (
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </div>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification />
          <div style={{ marginBottom: '20px' }}>
            {user.name} logged in
            <button onClick={() => dispatch(userLogout())}>logout</button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <BlogList user={user} />
          <h1>Users</h1>
          <UsersList />
        </>
      )}
    </>
  )
}

export default App
