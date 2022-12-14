import Number from './Number';

const Persons = ({
  showAll,
  persons,
  filterNames,
  personService,
  setPersons,
}) => {
  const numberToShow = showAll
    ? persons
    : persons.filter((person) =>
        (person.name || '').toLowerCase().includes(filterNames.toLowerCase())
      );

  //Delete contact
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .remove(`${id}`)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`The contact ${name} was already deleted`);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      {numberToShow.map((person) => (
        <Number
          key={person.id}
          name={person.name}
          number={person.number}
          onClick={() => handleDelete(person.id, person.name)}
        />
      ))}
    </div>
  );
};

export default Persons;
