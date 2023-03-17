import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user, removeBlog }) => {
  const blogs = useSelector((state) => state.blog)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} user={user} blog={blog} deleteBlog={removeBlog} />
      ))}
    </div>
  )
}

export default BlogList
