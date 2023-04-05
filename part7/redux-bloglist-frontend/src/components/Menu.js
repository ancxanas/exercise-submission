import { Link, Route, Routes } from 'react-router-dom'
import Blogs from './Blog/Blogs'
import Blog from './Blog/Blog'
import User from './User/User'
import UsersList from './User/UsersList'
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
          <Typography sx={{ p: 1 }} color="inherit">
            {user.name} logged in
          </Typography>
          <Button color="inherit" onClick={() => dispatch(userLogout())}>
            logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 1 }}>
        <Typography sx={{ color: 'primary.main' }} variant="h2">
          blog app
        </Typography>
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
