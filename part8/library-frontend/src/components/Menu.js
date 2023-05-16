import { Link, Route, Routes } from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import NewBook from './NewBook'

const Menu = () => {
  return (
    <div>
      <div>
        <Link>
          <button to="/">authors</button>
        </Link>
        <Link>
          <button to="/books">books</button>
        </Link>
        <Link>
          <button to="/add_book">add book</button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add_book" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default Menu
