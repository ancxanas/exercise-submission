import { Link, Route, Routes } from 'react-router-dom'
import Blogs from './Blog/Blogs'
import Blog from './Blog/Blog'
import User from './User/User'
import UsersList from './User/UsersList'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'

const Menu = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  return (
    <>
      <div>
        <Link to="/">
          <button>blogs</button>
        </Link>
        <Link to="/users">
          <button>users</button>
        </Link>
        <button>{user.name} logged in</button>
        <button onClick={() => dispatch(userLogout())}>logout</button>
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
