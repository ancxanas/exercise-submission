import { Link, Route, Routes } from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import NewBook from './NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from '../queries'
import LoginForm from './LoginForm'
import { useState } from 'react'

const Menu = () => {
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  if (authors.loading || books.loading) return <div>loading...</div>

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
        <Link to="/add_new">
          <button>add new</button>
        </Link>
      )}

      <Routes>
        <Route
          path="/"
          element={<Authors authors={authors.data.allAuthors} />}
        />
        <Route path="/books" element={<Books books={books.data.allBooks} />} />
        <Route path="/add_new" element={<NewBook />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  )
}

export default Menu
