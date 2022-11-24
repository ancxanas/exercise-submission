const Course = ({ name, parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total sum={total} />
    </div>
  );
};

const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </>
);

const Total = ({ sum }) => (
  <p style={{ fontWeight: 'bold' }}>total of {sum} exercises</p>
);

export default Course;
