import { useApolloClient, useSubscription } from '@apollo/client'
import Menu from './components/Menu'
import { ALL_BOOKS, BOOK_ADDED, FIND_BOOK_BY_GENRE } from './queries'

const App = () => {
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded

      client.cache.updateQuery(
        { query: FIND_BOOK_BY_GENRE, variables: { genre: '' } },
        ({ allBooks }) => {
          return { allBooks: allBooks.concat(addedBook) }
        }
      )
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return (
    <div>
      <Menu />
    </div>
  )
}

export default App
