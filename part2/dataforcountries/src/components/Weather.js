import axios from 'axios';
import { useState, useEffect } from 'react';

const Capital = ({ countries }) => countries.map((country) => country.capital);

const Weather = ({ countries }) => {
  const [weather, setWeather] = useState([]);

  const location =
    countries.length === 1 ? countries.map((country) => country.capital) : null;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [location]);

  const tempValue = Object.values(weather).map((value) => value.temp);
  const temperature = Number(tempValue[3] - 273.15).toFixed(2);

  const windValue = Object.values(weather).map((value) => value.speed);
  const wind = Number(windValue[5]);

  const icon = Object.values(weather.weather || {}).map((x) => x.icon);

  return (
    <>
      <h3>
        Weather in <Capital countries={countries} />
      </h3>
      <div>temperature {temperature} Celsius</div>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather-icon"
        />
      </div>
      <div>wind {wind} m/s</div>
    </>
  );
};

export default Weather;
