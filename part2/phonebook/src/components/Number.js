const Number = ({ name, number, onClick }) => (
  <>
    <div>
      {name} {number}
    </div>
    <button onClick={onClick}>delete</button>
  </>
);

export default Number;
