import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import AddBlogForm from './components/AddBlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong username or password');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser('');
  };

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setSuccessMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        );
        setTimeout(() => setSuccessMessage(null), 5000);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => setErrorMessage(null), 5000);
      });
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return (
      <div className={successMessage ? 'success' : 'error'}>{message}</div>
    );
  };

  const blogList = () => <BlogList blogs={blogs} />;

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  );

  return (
    <>
      {!user && (
        <div>
          <h2>Log in to application</h2>
          <Notification message={errorMessage} />
          {loginForm()}
        </div>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification message={successMessage || errorMessage} />
          <div style={{ marginBottom: '20px' }}>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          {<AddBlogForm createBlog={addBlog} />}
          {blogList()}
        </>
      )}
    </>
  );
};

export default App;
