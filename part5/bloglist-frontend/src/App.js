import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
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
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setTimeout(() => setSuccessMessage(null), 5000)
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  const handleIncrementLike = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject.id, blogObject)

    setBlogs(
      blogs
        .map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
    )
  }

  const handleDeleteBlog = async (blogObject) => {
    await blogService.remove(blogObject.id)
    setBlogs(blogs.filter((blogs) => blogs.id !== blogObject.id))
  }

  return (
    <>
      {!user && (
        <div>
          <h2>Log in to application</h2>
          <Notification
            message={errorMessage}
            successMessage={successMessage}
          />
          <LoginForm userLogin={handleSubmit} />
        </div>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification
            message={successMessage || errorMessage}
            successMessage={successMessage}
          />
          <div style={{ marginBottom: '20px' }}>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <AddBlogForm createBlog={addBlog} />
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
