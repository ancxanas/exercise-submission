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
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'

const Menu = () => {
  const user = useSelector((state) => state.login)

  const [mobileOpen, setMobileOpen] = useState(false)

  const dispatch = useDispatch()

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState)

  const container =
    window !== undefined ? () => window.document.body : undefined

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
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
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
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            PaperProps={{
              sx: {
                bgcolor: 'background',
              },
            }}
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            <Typography variant="h6" sx={{ m: 2 }}>
              Blog app
            </Typography>
            <Divider />
            <List>
              <ListItem
                onClick={() => setMobileOpen(false)}
                component={Link}
                to="/"
              >
                <ListItemText sx={{ color: 'primary.main' }}>
                  BLOGS
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => setMobileOpen(false)}
                component={Link}
                to="/users"
              >
                <ListItemText sx={{ color: 'primary.main' }}>
                  USERS
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>{user.name} logged in</ListItemText>
              </ListItem>
              <ListItem onClick={() => dispatch(userLogout())}>
                <ListItemText>LOGOUT</ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </Box>
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
