import { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </>
  );
};

const AnecdoteMost = ({ anecdote, votes }) => {
  if (votes === 0) return <div>Not voted yet</div>;

  return (
    <>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0]);

  const random = Math.floor(Math.random() * anecdotes.length);
  const mostVotes = Math.max(...points);
  const indexOfMostVotes = points.indexOf(mostVotes);

  const randomSelect = () => {
    setSelected([random]);
  };

  const handlePoints = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button onClick={handlePoints} text="vote" />
      <Button onClick={randomSelect} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <AnecdoteMost anecdote={anecdotes[indexOfMostVotes]} votes={mostVotes} />
    </>
  );
};

export default App;
