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
    <Card sx={{ m: 2, p: 6, boxShadow: 12 }}>
      <Typography
        sx={{ my: 2 }}
        textAlign="center"
        gutterBottom
        variant="h4"
        component="div"
      >
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
            minHeight: 100,
            minWidth: 150,
            boxShadow: 5,
          }}
          image={country.flags.svg}
        />
      </Grid>

      <CardContent>
        <Typography textAlign="center">Capital: {country.capital} </Typography>
        <Typography textAlign="center">
          Population: {country.population}
        </Typography>
        <Typography textAlign="center">Area: {country.area}</Typography>
        <Typography textAlign="center">
          Continent: {country.continents}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Country
