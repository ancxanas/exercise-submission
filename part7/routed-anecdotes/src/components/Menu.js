import Anecdote from './Anecdote'
import { Link, Route, Routes } from 'react-router-dom'
import Notification from './Notification'
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'

const Menu = ({ anecdotes, anecdote, handleNewAnecdote, notification }) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>

      <Notification notification={notification} />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route
          path="/create"
          element={<CreateNew addNew={handleNewAnecdote} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default Menu
