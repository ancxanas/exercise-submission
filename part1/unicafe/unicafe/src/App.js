import { useState } from 'react';

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Buttons = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodPlusOne = () => setGood(good + 1);
  const neutralPlusOne = () => setNeutral(neutral + 1);
  const badPlusOne = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const percentage = (good / all) * 100;

  return (
    <>
      <Header text="give feedback" />
      <Buttons onClick={goodPlusOne} text="good" />
      <Buttons onClick={neutralPlusOne} text="neutral" />
      <Buttons onClick={badPlusOne} text="bad" />
      <Header text="statistics" />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>percentage {percentage}</p>
    </>
  );
};

export default App;
