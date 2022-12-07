const Name = ({ countries }) => (
  <h1>
    {countries.map((country) => (
      <Country key={country.name.common} name={country.name.common} />
    ))}
  </h1>
);

const Details = ({ countries }) => (
  <div>
    {countries.map((country) => (
      <Info key={country.capital} name="capital" value={country.capital} />
    ))}
    {countries.map((country) => (
      <Info key={country.area} name="area" value={country.area} />
    ))}
  </div>
);

const Languages = ({ countries }) => (
  <ul>
    {countries.map((country) => {
      return Object.values(country.languages).map((language) => (
        <Language key={language} language={language} />
      ));
    })}
  </ul>
);

const Flag = ({ countries }) => (
  <div>
    {countries.map((country) => (
      <img
        key={country.name.common}
        src={country.flags.svg}
        width="150"
        alt={`flag of ${country.name.common}`}
      />
    ))}
  </div>
);

const Language = ({ language }) => <li>{language}</li>;

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
        <Name countries={countriesToShow} />
        <Details countries={countriesToShow} />
        <h4>languages:</h4>
        <Languages countries={countriesToShow} />
        <Flag countries={countriesToShow} />
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
