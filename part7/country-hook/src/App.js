import React, { useState } from 'react'
import Country from './components/Country'
import { useField, useCountry } from './hooks'
import { Container, Button, Grid, CssBaseline } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import StyledTextField from './components/StyledTextField'
import StyledButton from './components/StyledButton'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <Container
      sx={{
        m: 0,
        p: 0,
        minWidth: '100vw',
        minHeight: '100vh',
        bgcolor: '#607d8b',
      }}
    >
      <CssBaseline />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ p: 4 }}
      >
        <form onSubmit={fetch}>
          <StyledTextField
            placeholder="Type Something..."
            size="small"
            {...nameInput}
          />
          <StyledButton size="large" variant="outlined">
            <SearchIcon />
          </StyledButton>
        </form>
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ p: 4 }}
      >
        <Country country={country} nameInput={nameInput.value} />
      </Grid>
    </Container>
  )
}

export default App
