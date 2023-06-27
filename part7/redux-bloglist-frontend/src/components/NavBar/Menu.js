import { Link, Route, Routes } from 'react-router-dom'
import Blogs from '../Blog/Blogs'
import Blog from '../Blog/Blog'
import User from '../User/User'
import UsersList from '../User/UsersList'
import Notification from '../Notification/Notification'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../../reducers/loginReducer'
import './Menu.css'

const Menu = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  return (
    <>
      <div className="navbar">
        <div>
          <Link to="/">
            <button className="navbar-button">blogs</button>
          </Link>
          <Link to="/users">
            <button className="navbar-button">users</button>
          </Link>
        </div>
        <div>
          <button className="navbar-button">{user.name} logged in</button>
          <button
            className="navbar-button"
            onClick={() => dispatch(userLogout())}
          >
            logout
          </button>
        </div>
      </div>

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
