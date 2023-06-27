import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './BlogList.css'

const BlogList = () => {
  const blogs = useSelector((state) => state.blog)

  return (
    <div>
      <table className="bloglist-table">
        <tbody>
          {blogs.map((blog) => (
            <tr className="bloglist-row" key={blog.id}>
              <td>
                <Link className="bloglist-link" to={`/blogs/${blog.id}`}>
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
