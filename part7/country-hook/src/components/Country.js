import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'

const Country = ({ country, nameInput }) => {
  if (!country) {
    return null
  }

  if (nameInput === '') {
    return null
  } else if (country === 'Not Found') {
    return <div>not found...</div>
  }

  country = country[0]

  return (
    <Card sx={{ m: 2 }}>
      <Typography textAlign="center" gutterBottom variant="h6" component="div">
        {country.name.common}
      </Typography>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <CardMedia
          sx={{
            height: 100,
            width: 150,
          }}
          image={country.flags.svg}
        />
      </Grid>
      <CardContent>
        <Typography>capital {country.capital} </Typography>
        <Typography>population {country.population}</Typography>
      </CardContent>
    </Card>
  )
}

export default Country
