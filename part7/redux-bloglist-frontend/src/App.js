import React, { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import Menu from './components/Menu'
import { Box, Container, Grid, CssBaseline } from '@mui/material'

const App = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
    dispatch(getLoggedUser())
  }, [])

  useEffect(() => {
    if (user) blogService.setToken(user.token)
  }, [user])

  return (
    <Container
      sx={{
        m: 0,
        p: 0,
        bgcolor: 'background',
        minWidth: '100vw',
      }}
    >
      <CssBaseline />
      {!user && (
        <Box>
          <Grid container justifyContent="center">
            <Notification />
          </Grid>

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <LoginForm />
            </Grid>
          </Grid>
        </Box>
      )}
      {user && <Menu />}
    </Container>
  )
}

export default App
