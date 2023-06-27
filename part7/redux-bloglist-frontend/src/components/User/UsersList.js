import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './UsersList.css'

const UsersList = () => {
  const users = useSelector((state) => state.user)

  return (
    <>
      <h1 className="userslist-title">Users</h1>
      <table className="userslist-table">
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr className="userslist-row" key={user.id}>
              <td>
                <Link className="userslist-link" to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UsersList
