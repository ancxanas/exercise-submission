import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const users = useSelector((state) => state.user)

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box sx={{ p: 1 }}>
        <Typography color="primary.main" variant="h2">
          Users
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography color="primary.main">blogs created</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`/users/${user.id}`}
                  >
                    <Typography color="primary.main">{user.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography color="primary.main">
                    {user.blogs.length}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UsersList
