import { Link, Route, Routes } from 'react-router-dom'
import BlogList from './BlogList'

const Menu = () => (
  <>
    <div>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
    </div>

    <Routes>
      <Route path="/" element={<BlogList />} />
    </Routes>
  </>
)

export default Menu
