const CountryName = ({ name }) => <div>{name}</div>;

const Name = ({ countries }) => (
  <h1>
    {countries.map((country) => (
      <CountryName key={country.name.common} name={country.name.common} />
    ))}
  </h1>
);

export default Name;
