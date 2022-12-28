import axios from 'axios';
import { useState, useEffect } from 'react';

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

const Capital = ({ countries }) => countries.map((country) => country.capital);

const Language = ({ language }) => <li>{language}</li>;

const CountryName = ({ name }) => <div>{name}</div>;

const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>;

const Info = ({ name, value }) => (
  <div>
    {name} {value}
  </div>
);

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

const Countries = ({ countries, showAll, filterCountries }) => {
  const [weather, setWeather] = useState([]);

  const countriesToShow = showAll
    ? countries
    : countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(filterCountries.toLowerCase())
      );

  const location =
    countriesToShow.length === 1
      ? countriesToShow.map((country) => country.capital)
      : null;

  console.log(location);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [location]);

  console.log(weather);

  const tempValue = Object.values(weather).map((value) => value.temp);
  const temperature = Number(tempValue[3] - 273.15).toFixed(2);

  console.log(temperature);

  const windSpeed = Object.values(weather).map((value) => value.speed);
  const wind = Number(windSpeed[5]);
  console.log(wind);

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
        <h3>
          Weather in <Capital countries={countriesToShow} />
        </h3>
        <div>temperature {temperature} Celsius</div>
        <div>wind {wind} m/s</div>
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
