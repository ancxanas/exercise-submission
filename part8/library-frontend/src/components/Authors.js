import AuthorForm from './AuthorForm'

const Authors = ({ authors, token }) => {
  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {token ? <AuthorForm authors={authors} /> : null}
    </div>
  )
}

export default Authors
