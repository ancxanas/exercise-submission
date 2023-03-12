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
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flags.svg}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  )
}

export default Country
