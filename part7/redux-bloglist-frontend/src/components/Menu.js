import { Link, Route, Routes } from 'react-router-dom'
import Blogs from './Blogs'
import Blog from './Blog'
import User from './User'
import UsersList from './UsersList'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'

const Menu = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          <Button color="inherit">{user.name} logged in</Button>
          <Button color="inherit" onClick={() => dispatch(userLogout())}>
            logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 1 }}>
        <Typography variant="h2">blog app</Typography>
      </Box>
      <Notification />

      <Routes>
        <Route path="blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </>
  )
}

export default Menu
