import { Link, Route, Routes } from 'react-router-dom'
import BlogList from './BlogList'
import User from './User'

const Menu = () => (
  <>
    <div>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
    </div>

    <Routes>
      <Route path="/users/:id" element={<User />} />
      <Route path="/" element={<BlogList />} />
    </Routes>
  </>
)

export default Menu
