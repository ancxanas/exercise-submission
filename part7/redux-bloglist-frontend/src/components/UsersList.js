import { useSelector } from 'react-redux'
import User from './User'

const UsersList = () => {
  const users = useSelector((state) => state.user)

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  )
}

export default UsersList
