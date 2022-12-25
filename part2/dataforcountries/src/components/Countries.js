import { useState } from 'react';

const Name = ({ countries }) => (
  <h1>
    {countries.map((country) => (
      <CountryName key={country.name.common} name={country.name.common} />
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

const CountryName = ({ name }) => <div>{name}</div>;

const Country = ({ name, capital, area, languages, flag }) => {
  const [isShown, setIsShown] = useState(false);

  const showDetails = () => {
    setIsShown((show) => !show);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>{name}</div>
        <Button name={isShown ? 'hide' : 'show'} onClick={showDetails} />
      </div>
      {isShown && (
        <>
          <h1 key={name}>{name}</h1>
          <Info key={capital} name="capital" value={capital} />
          <Info key={area} name="area" value={area} />
          <h4>languages:</h4>
          <ul>
            {Object.values(languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <div>
            <img key={name} src={flag} width="150" alt={`flag of ${name}`} />
          </div>
        </>
      )}
    </>
  );
};

const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>;

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
