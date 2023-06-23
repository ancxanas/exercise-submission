import { Link, Route, Routes } from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import NewBook from './NewBook'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from '../queries'
import LoginForm from './LoginForm'
import { useEffect, useState } from 'react'
import Recommend from './Recommend'

const Menu = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setToken(token)
  }, [])

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  if (authors.loading || books.loading) return <div>loading...</div>
  const genres = [
    ...new Set(books.data.allBooks.map((book) => book.genres).flat()),
  ]

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Link to="/">
        <button>authors</button>
      </Link>
      <Link to="/books">
        <button>books</button>
      </Link>
      {!token ? (
        <Link to="/login">
          <button>login</button>
        </Link>
      ) : (
        <>
          <Link to="/add_new">
            <button>add new</button>
          </Link>
          <Link to="/recommend">
            <button>recommend</button>
          </Link>
          <button onClick={logout}>logout</button>
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={<Authors authors={authors.data.allAuthors} token={token} />}
        />
        <Route path="/books" element={<Books genres={genres} />} />
        <Route path="/add_new" element={<NewBook />} />
        <Route
          path="recommend"
          element={<Recommend books={books.data.allBooks} />}
        />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  )
}

export default Menu
