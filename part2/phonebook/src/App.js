import { useState } from 'react';

const Number = ({ name }) => <li>{name}</li>;

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addName = (e) => {
    e.preventDefault();
    const names = persons.map((person) => person.name);
    const nameCheck = names.some((name) => name === newName);
    if (nameCheck) return alert(`${newName} is already added to phonebook`);
    const nameObject = {
      name: newName,
    };

    setPersons(persons.concat(nameObject));
    setNewName('');
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Number key={person.name} name={person.name} />
        ))}
      </ul>
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
