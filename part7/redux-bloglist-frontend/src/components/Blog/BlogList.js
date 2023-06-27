import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blog)

  return (
    <div>
      <table>
        <tbody>
          {blogs.map((blog) => (
            <tr className="bloglist" key={blog.id}>
              <td>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BlogList
