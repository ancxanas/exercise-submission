import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { setBlogs, appendBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(
        setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes))
      )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleSubmit = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        dispatch(appendBlog(returnedBlog))
        dispatch(
          setNotification(
            `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
          )
        )
      })
      .catch((error) => {
        dispatch(setNotification(error.response.data.error))
      })
  }

  const handleDeleteBlog = async (blogObject) => {
    dispatch(
      setNotification(
        `blog ${blogObject.title} by ${blogObject.author} deleted`
      )
    )
    await blogService.remove(blogObject.id)
    // setBlogs(blogs.filter((blogs) => blogs.id !== blogObject.id))
  }

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
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <BlogList user={user} removeBlog={handleDeleteBlog} />
        </>
      )}
    </>
  )
}

export default App
