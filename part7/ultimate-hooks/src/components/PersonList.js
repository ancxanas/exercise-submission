const PersonList = ({ persons }) => (
  <>
    {persons.map((n) => (
      <p key={n.id}>
        {n.name} {n.number}
      </p>
    ))}
  </>
)

export default PersonList
