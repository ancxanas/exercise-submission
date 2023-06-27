import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const users = useSelector((state) => state.user)

  return (
    <div>
      <div>Users</div>
      <table>
        <th>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
        </th>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/users/${user.id}`}
                >
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
