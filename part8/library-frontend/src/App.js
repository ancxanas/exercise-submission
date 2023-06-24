import { useApolloClient, useSubscription } from '@apollo/client'
import Menu from './components/Menu'
import { BOOK_ADDED, FIND_BOOK_BY_GENRE } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqueByName = (itemsToFilter) => {
    let books = new Set()
    return itemsToFilter.filter((item) => {
      let book = item.title
      return books.has(book) ? false : books.add(book)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded

      updateCache(
        client.cache,
        {
          query: FIND_BOOK_BY_GENRE,
          variables: { genre: '' },
        },
        addedBook
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
