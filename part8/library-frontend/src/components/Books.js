import { useState } from 'react'

const Books = ({ books }) => {
  const [filter, setFilter] = useState('all genres')

  let flattenedGenreArray = books.map((book) => book.genres).flat()
  let genres = [...new Set(flattenedGenreArray)]

  const filteredBooks =
    filter !== 'all genres'
      ? books.filter((book) => book.genres.includes(filter))
      : books

  const filterBooks = (e) => {
    setFilter(e.target.value)
  }

  const showAll = (e) => setFilter(e.target.value)

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <strong>{filter}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
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

      <button onClick={showAll} value="all genres">
        all genres
      </button>
    </div>
  )
}

export default Books
