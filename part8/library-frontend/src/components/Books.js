import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { FIND_BOOK_BY_GENRE } from '../queries'

const Books = ({ genres }) => {
  const [filter, setFilter] = useState('')

  const bookByGenre = useQuery(FIND_BOOK_BY_GENRE, {
    variables: { genre: filter },
    fetchPolicy: 'cache-and-network',
  })

  if (bookByGenre.loading) return <div>loading...</div>

  const books = bookByGenre.data.allBooks

  const filterBooks = (e) => {
    setFilter(e.target.value)
  }

  const showAll = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <strong>{filter === '' ? 'all genres' : filter}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button onClick={filterBooks} key={genre} value={genre}>
          {genre}
        </button>
      ))}

      <button onClick={showAll} value="">
        all genres
      </button>
    </div>
  )
}

export default Books
