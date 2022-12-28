import Info from './Info';

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

export default Details;
