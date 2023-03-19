import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedUser, setLoggedUser, setUser } from './reducers/loginReducer'

const App = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(getLoggedUser())
  }, [])

  useEffect(() => {
    if (user) blogService.setToken(user.token)
  }, [user])

  const handleSubmit = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      // window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setLoggedUser(user))
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(''))
  }

  const blogFormRef = useRef()

  return (
    <>
      {!user && (
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm userLogin={handleSubmit} />
        </div>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification />
          <div style={{ marginBottom: '20px' }}>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <BlogList user={user} />
        </>
      )}
    </>
  )
}

export default App
