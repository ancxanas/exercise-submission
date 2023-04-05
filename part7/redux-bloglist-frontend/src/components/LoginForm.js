import { Box, Button, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import StyledTextField from './StyledTextField'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    const user = {
      username,
      password,
    }

    dispatch(userLogin(user))

    setUsername('')
    setPassword('')
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h2" color="primary.main" sx={{ p: 3 }}>
        Blog app
      </Typography>
      <form onSubmit={handleLogin}>
        <Box sx={{ m: 1 }}>
          <StyledTextField
            id="username"
            type="text"
            value={username}
            name="Username"
            label="username"
            size="small"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <StyledTextField
            id="password"
            type="password"
            value={password}
            name="Password"
            size="small"
            label="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Box>
        <Grid sx={{ p: 1 }} container justifyContent="center">
          <Button
            variant="outlined"
            size="small"
            id="login-button"
            type="submit"
          >
            login
          </Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default LoginForm
