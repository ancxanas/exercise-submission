import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  const submit = (event) => {
    event.preventDefault()

    document.getElementById('select').value = 'select'

    editAuthor({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        name
        <select id="select" onChange={(e) => setName(e.target.value)}>
          <option value="select" defaultValue>
            select
          </option>
          {authors.map((author) => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
