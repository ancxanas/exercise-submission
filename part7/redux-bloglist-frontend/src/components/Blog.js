import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    dispatch(setNotification(`liked the blog '${blog.title}'`))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`${blog.title} by ${blog.author} deleted`))
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
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes
          <button onClick={() => like(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {blog.user.username === user.username ? (
          <button onClick={handleRemove}>remove</button>
        ) : null}
      </div>
      <div>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input
            type="text"
            value={content}
            name="comment"
            onChange={({ target }) => setContent(target.value)}
          />
          <button type="submit">add comment</button>
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
