import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes))
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
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
    })
    dispatch(setNotification(`you added '${blogObject.title}'`))
  }

  const handleIncrementLike = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject.id, blogObject)

    setBlogs(
      blogs
        .map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
    )
    dispatch(setNotification(`you liked ${updatedBlog.title}`))
  }

  const handleDeleteBlog = async (blogObject) => {
    await blogService.remove(blogObject.id)
    setBlogs(blogs.filter((blogs) => blogs.id !== blogObject.id))
    dispatch(setNotification(`you deleted ${blogObject.title}`))
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
          <BlogList
            blogs={blogs}
            user={user}
            updatedBlog={handleIncrementLike}
            removeBlog={handleDeleteBlog}
          />
        </>
      )}
    </>
  )
}

export default App
