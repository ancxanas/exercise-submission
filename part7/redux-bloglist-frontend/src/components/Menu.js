import { Link, Route, Routes } from 'react-router-dom'
import BlogList from './BlogList'
import User from './User'
import UsersList from './UsersList'

const Menu = () => {
  return (
    <>
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </>
  )
}

export default Menu
