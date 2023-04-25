import React, { useState } from 'react'
import Country from './components/Country'
import { useField, useCountry } from './hooks'
import { Box, Grid } from '@mui/material'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      sx={{ minHeight: '100vh' }}
    >
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} nameInput={nameInput.value} />
    </Grid>
  )
}

export default App
