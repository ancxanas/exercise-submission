import { useSelector } from 'react-redux'

const UsersList = () => {
  const users = useSelector((state) => state.user)
  console.log(users)

  return (
    <div>hello</div>
    // <ul>
    //   {users.map((user) => (
    //     <li key={user.id}>{user.name}</li>
    //   ))}
    // </ul>
  )
}

export default UsersList
