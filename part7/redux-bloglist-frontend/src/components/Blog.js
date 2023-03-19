import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const like = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`liked the blog '${blog.title}'`))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'view'}</button>
      {show && (
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            likes {blog.likes}
            <button onClick={() => like(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username ? (
            <button onClick={handleRemove}>remove</button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Blog
