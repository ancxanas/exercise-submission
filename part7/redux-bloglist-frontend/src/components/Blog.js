import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, deleteBlog }) => {
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
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
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
