import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterNames, setFilterNames] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });
  }, []);

  //Add a new contact
  const addName = (e) => {
    e.preventDefault();

    const nameCheck = persons
      .map((person) => person.name)
      .some((name) => name === newName);

    //Update an existing contact
    if (nameCheck) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const id = person.id;
        const changedNumber = { ...person, number: newNumber };

        personService
          .update(`${id}`, changedNumber)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
            setSuccessMessage(`Updated ${returnedPerson.name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            setPersons(persons.filter((person) => person.id !== id));
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    //Create new contact
    personService.create(nameObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setSuccessMessage(`Added ${returnedPerson.name}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
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
      <Notification
        message={successMessage || errorMessage}
        successMessage={successMessage}
      />
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
