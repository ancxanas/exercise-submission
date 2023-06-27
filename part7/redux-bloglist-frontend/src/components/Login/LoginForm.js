import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../reducers/loginReducer'
import './LoginForm.css'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    const user = {
      username,
      password,
    }

    dispatch(userLogin(user))

    setUsername('')
    setPassword('')
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="login-form-title">
        Welcome, <br /> <span> login to continue</span>
      </div>
      <div className="input-div">
        <div>
          <input
            className="input"
            id="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            className="input"
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
