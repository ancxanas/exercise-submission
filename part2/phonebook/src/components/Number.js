const Number = ({ name, number, onClick }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div>
      {name} {number}
    </div>
    <button onClick={onClick}>delete</button>
  </div>
);

export default Number;
