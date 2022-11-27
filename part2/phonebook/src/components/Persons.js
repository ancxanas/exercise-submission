const Persons = ({ showAll, persons, filterNames }) => {
  const numberToShow = showAll
    ? persons
    : persons.filter((person) => {
        person = person.name.toLowerCase();
        return person.includes(filterNames.toLowerCase());
      });

  return (
    <div>
      {numberToShow.map((person) => (
        <Number key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

const Number = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
);

export default Persons;
