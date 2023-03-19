import { Link, Route, Routes } from 'react-router-dom'
import Blogs from './Blogs'
import Blog from './Blog'
import User from './User'
import UsersList from './UsersList'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'

const Menu = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  return (
    <>
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {user.name} logged in
        <button onClick={() => dispatch(userLogout())}>logout</button>
      </div>

      <h2>blog app</h2>
      <Notification />

      <Routes>
        <Route path="blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </>
  )
}

export default Menu
