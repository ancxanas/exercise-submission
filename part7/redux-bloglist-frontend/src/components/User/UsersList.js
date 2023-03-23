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
    <>
      <Box sx={{ p: 1 }}>
        <Typography variant="h2">Users</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
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
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UsersList
