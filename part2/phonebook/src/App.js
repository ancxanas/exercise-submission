import { useState } from 'react';

const Number = ({ name }) => <li>{name}</li>;

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addName = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
    };

    setPersons(persons.concat(nameObject));
    setNewName('');
  };

  const handleNameChange = (e) => {
    console.log(e.target.value);
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
    </div>
  );
};

export default App;
