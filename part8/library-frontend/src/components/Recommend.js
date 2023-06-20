import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommend = ({ books }) => {
  const me = useQuery(ME)

  if (me.loading) return <div>loading...</div>

  const favoriteGenre = me.data.me.favoriteGenre

  const recommendedBooks = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  )

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
