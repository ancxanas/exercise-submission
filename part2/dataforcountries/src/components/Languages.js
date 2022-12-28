const Language = ({ language }) => <li>{language}</li>;

const Languages = ({ countries }) => (
  <ul>
    {countries.map((country) => {
      return Object.values(country.languages).map((language) => (
        <Language key={language} language={language} />
      ));
    })}
  </ul>
);

export default Languages;
