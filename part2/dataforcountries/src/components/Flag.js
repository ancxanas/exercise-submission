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

export default Flag;
