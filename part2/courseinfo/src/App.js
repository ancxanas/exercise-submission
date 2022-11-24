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

const Header = ({ name }) => <h1>{name}</h1>;

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

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return courses.map((course) => (
    <Course key={course.id} name={course.name} parts={course.parts} />
  ));
};

export default App;
