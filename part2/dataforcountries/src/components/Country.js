import { useState } from 'react';
import Info from './Info';

const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>;

const Country = ({ name, capital, area, languages, flag }) => {
  const [isShown, setIsShown] = useState(false);

  const showDetails = () => {
    setIsShown((show) => !show);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>{name}</div>
        <Button name={isShown ? 'hide' : 'show'} onClick={showDetails} />
      </div>
      {isShown && (
        <>
          <h1 key={name}>{name}</h1>
          <Info key={capital} name="capital" value={capital} />
          <Info key={area} name="area" value={area} />
          <h4>languages:</h4>
          <ul>
            {Object.values(languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <div>
            <img key={name} src={flag} width="150" alt={`flag of ${name}`} />
          </div>
        </>
      )}
    </>
  );
};

export default Country;
