import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('Wrong Credential');
    }
  };

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  );

  const bloglist = () => <BlogList blogs={blogs} />;

  return (
    <>
      {!user && (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <p> {user.name} logged in</p>
          {bloglist()}
        </div>
      )}
    </>
  );
};

export default App;
