import { Link, Route, Routes } from 'react-router-dom'
import Blogs from '../components/Blogs'
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
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </>
  )
}

export default Menu