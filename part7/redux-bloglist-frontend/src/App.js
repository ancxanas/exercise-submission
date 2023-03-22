import { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import Menu from './components/Menu'
import {
  Container,
  Grid,
  ThemeProvider,
  createTheme,
  Typography,
} from '@mui/material'

let theme = createTheme({
  typography: {
    h2: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
})

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
    <Container>
      <ThemeProvider theme={theme}>
        {!user && (
          <div>
            <Grid container justifyContent="center">
              <Notification />
            </Grid>

            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: '100vh' }}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h2">Log in to application</Typography>
                <LoginForm />
              </Grid>
            </Grid>
          </div>
        )}
        {user && <Menu />}
      </ThemeProvider>
    </Container>
  )
}

export default App
