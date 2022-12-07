import axios from 'axios';
import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterCountries = (e) => {
    setFilterCountries(e.target.value);
    setShowAll(false);
  };

  return (
    <>
      <Filter value={filterCountries} onChange={handleFilterCountries} />
      <Countries
        countries={countries}
        showAll={showAll}
        filterCountries={filterCountries}
      />
    </>
  );
};

export default App;
