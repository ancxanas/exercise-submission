const Country = ({ name }) => <div>{name}</div>;

const Info = ({ name, value }) => (
  <div>
    {name} {value}
  </div>
);

const Countries = ({ countries, showAll, filterCountries }) => {
  const countriesToShow = showAll
    ? countries
    : countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(filterCountries.toLowerCase())
      );

  if (filterCountries === '') return;

  if (countriesToShow.length >= 10)
    return <div>Too many matches,specify another filter</div>;

  if (countriesToShow.length === 1)
    return (
      <>
        <h1>
          {countriesToShow.map((country) => (
            <Country key={country.name.common} name={country.name.common} />
          ))}
        </h1>
        <div>
          {countriesToShow.map((country) => (
            <Info
              key={country.capital}
              name="capital"
              value={country.capital}
            />
          ))}
          {countriesToShow.map((country) => (
            <Info key={country.area} name="area" value={country.area} />
          ))}
        </div>
      </>
    );

  return (
    <div>
      {countriesToShow.map((country) => (
        <Country key={country.name.common} name={country.name.common} />
      ))}
    </div>
  );
};

export default Countries;
