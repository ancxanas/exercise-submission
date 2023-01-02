import axios from 'axios';
import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterNames, setFilterNames] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const names = persons.map((person) => person.name);
    const nameCheck = names.some((name) => name === newName);
    if (nameCheck) return alert(`${newName} is already added to phonebook`);
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    axios.post('http://localhost:3001/persons', nameObject).then((response) => {
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    });
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterNames = (e) => {
    setFilterNames(e.target.value);
    setShowAll(false);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterNames} onChange={handleFilterNames} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} showAll={showAll} filterNames={filterNames} />
    </div>
  );
};

export default App;
