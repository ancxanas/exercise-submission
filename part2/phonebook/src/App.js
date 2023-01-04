import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterNames, setFilterNames] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
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

    personService.create(nameObject).then((returnedNote) => {
      setPersons(persons.concat(returnedNote));
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
      <Persons
        persons={persons}
        showAll={showAll}
        filterNames={filterNames}
        personService={personService}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
