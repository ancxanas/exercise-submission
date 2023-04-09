import { Link, Route, Routes } from 'react-router-dom'
import Blogs from './Blog/Blogs'
import Blog from './Blog/Blog'
import User from './User/User'
import UsersList from './User/UsersList'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Menu = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar sx={{ p: 1 }} component="nav" position="fixed">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => console.log('hello')}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Button color="inherit" component={Link} to="/">
              <Typography color="secondary.main">blogs</Typography>
            </Button>
            <Button color="inherit" component={Link} to="/users">
              <Typography color="secondary.main">users</Typography>
            </Button>

            <Typography sx={{ p: 1 }} color="secondary.main">
              {user.name} logged in
            </Typography>
            <Button
              sx={{ bgcolor: 'background' }}
              color="inherit"
              onClick={() => dispatch(userLogout())}
            >
              <Typography color="secondary.main"> logout</Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Toolbar />

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
