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
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
      console.log('Wrong Credential');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser('');
  };

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => setBlogs(blogs.concat(returnedBlog)));

    // setTitle('');
    // setAuthor('');
    // setUrl('');
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

  const blogList = () => <BlogList blogs={blogs} />;

  return (
    <>
      {!user && (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <div style={{ marginBottom: '20px' }}>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          {blogList()}
          <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
              <div>
                title:
                <input
                  type="text"
                  value={title}
                  name="title"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </div>
              <div>
                author:
                <input
                  type="text"
                  value={author}
                  name="author"
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </div>
              <div>
                url:{' '}
                <input
                  type="url"
                  value={url}
                  name="url"
                  onChange={({ target }) => setUrl(target.value)}
                />
              </div>
              <button type="submit">create</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default App;
