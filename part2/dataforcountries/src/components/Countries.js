import Name from './Name';
import Details from './Details';
import Languages from './Languages';
import Flag from './Flag';
import Weather from './Weather';
import Country from './Country';

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
        <Weather countries={countriesToShow} />
      </>
    );

  return (
    <div>
      {countriesToShow.map((country) => (
        <Country
          key={country.name.common}
          name={country.name.common}
          capital={country.capital}
          area={country.area}
          languages={country.languages}
          flag={country.flags.svg}
        />
      ))}
    </div>
  );
};

export default Countries;
