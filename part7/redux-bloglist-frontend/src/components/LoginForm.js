import { Box, Button, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'

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
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <form onSubmit={handleLogin}>
        <Box sx={{ m: 1 }}>
          <TextField
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
          <TextField
            id="password"
            type="password"
            value={password}
            name="Password"
            size="small"
            label="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Box>
        <Grid container justifyContent="center">
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
