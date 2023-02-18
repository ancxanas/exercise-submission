import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updatedLike, deleteBlog }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const incrementLike = () => {
    updatedLike({ ...blog, likes: (blog.likes += 1) })
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    updatedLike: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'view'}</button>
      {show && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={incrementLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username ? (
            <button onClick={handleRemove}>remove</button>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Blog
