import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import './User.css'

const User = () => {
  const users = useSelector((state) => state.user)

  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) return null

  return (
    <>
      <div className="user-container">
        <h2 className="user-name-title">{user.name}</h2>

        <div>
          <h3 className="added-blog-title">added blogs</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default User
