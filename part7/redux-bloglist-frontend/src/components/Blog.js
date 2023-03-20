import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const user = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blog)

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const dispatch = useDispatch()

  const navigate = useNavigate()

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
