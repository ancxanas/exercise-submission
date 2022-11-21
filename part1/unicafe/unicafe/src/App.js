import { useState } from 'react';

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Buttons = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td style={{ padding: 2.5 + 'px' }}>{text}</td>
      <td style={{ padding: 2.5 + 'px' }}>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.all === 0) {
    return <div>No feedbacks given</div>;
  }
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodPlusOne = () => setGood(good + 1);
  const neutralPlusOne = () => setNeutral(neutral + 1);
  const badPlusOne = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const average = ((good - bad) / all).toFixed(1);
  const positive = `${((good / all) * 100).toFixed(1)} %`;

  return (
    <>
      <Header text="give feedback" />
      <Buttons onClick={goodPlusOne} text="good" />
      <Buttons onClick={neutralPlusOne} text="neutral" />
      <Buttons onClick={badPlusOne} text="bad" />
      <Header text="statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
