import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blog)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow className="bloglist" key={blog.id}>
              <TableCell>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell>{blog.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList
