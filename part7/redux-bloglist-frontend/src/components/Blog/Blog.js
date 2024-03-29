import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog, createComment } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import './Blog.css'

const Blog = () => {
  const user = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blog)

  const [content, setContent] = useState('')

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const dispatch = useDispatch()

  const navigate = useNavigate()

  if (!blog) return null

  const like = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(
      setNotification({
        message: `liked the blog ${blog.title} by ${blog.author}`,
        severity: 'success',
      })
    )
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      dispatch(
        setNotification({
          message: `${blog.title} by ${blog.author} deleted`,
          severity: 'error',
        })
      )
      navigate('/')
    }
  }

  const addComment = (event) => {
    event.preventDefault()

    const comment = {
      content,
    }

    dispatch(createComment(blog.id, comment))

    setContent('')
  }

  return (
    <div>
      <div className="blog-container">
        <h2 className="blog-title">
          {blog.title} by {blog.author}
        </h2>

        <div className="blog-details">
          <a className="blog-url" href={blog.url}>
            {blog.url}
          </a>
          <div>
            {blog.likes} likes
            <button className="blog-like-button" onClick={() => like(blog)}>
              like
            </button>
          </div>
          added by {blog.user.name}
          {blog.user.username === user.username ? (
            <button className="blog-remove-button" onClick={handleRemove}>
              remove
            </button>
          ) : null}
        </div>
      </div>
      <div>
        <h3 className="comments-title">comments</h3>
        <form onSubmit={addComment}>
          <div display="flex">
            <input
              className="comment-input"
              id="comment-input"
              type="text"
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
            <button className="comment-button" type="submit">
              add comment
            </button>
          </div>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
