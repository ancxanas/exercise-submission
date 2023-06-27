import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import './BlogForm.css'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    dispatch(createBlog(newBlog))
    dispatch(
      setNotification({
        severity: 'success',
        message: `Blog ${newBlog.title} by ${newBlog.author} added`,
      })
    )
    blogFormRef.current.toggleVisibility()

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2 className="blogform-title">create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <input
            className="blogform-input"
            id="title"
            type="text"
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <input
            className="blogform-input"
            id="author"
            type="text"
            value={author}
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <input
            className="blogform-input"
            id="url"
            type="url"
            value={url}
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button className="blogform-button" id="create-button" type="submit">
            create
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
