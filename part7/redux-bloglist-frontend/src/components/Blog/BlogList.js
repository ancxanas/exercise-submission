import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blog)

  return (
    <Box sx={{ minHeight: '100vh' }}>
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
                    <Typography color="primary.main">{blog.title}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography color="primary.main">{blog.author}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default BlogList
