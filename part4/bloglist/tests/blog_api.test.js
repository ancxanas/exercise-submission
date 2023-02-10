const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific title is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);

    expect(titles).toContain('What the Heck Is World?');
  });
});

describe('checking if it exist', () => {
  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs');

    const id = response.body.map((r) => r.id);
    expect(id).toBeDefined();
  });
});

describe('addition of a new blog', () => {
  test('succeed with valid data', async () => {
    const newBlog = {
      title: 'Dark: The path to light',
      author: 'Ahmed Khan',
      url: 'https://www.ahmedcha.com/',
      likes: 106,
      userId: '63e6204d1d998fdc9e0b9bce',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('Dark: The path to light');
  });

  test('succeeds with defaulting the value of likes to zero if it is not present', async () => {
    const newBlog = {
      title: 'Nothing before',
      author: 'Ram Prasad',
      url: 'https://www.ramprasad.com/',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const addedBlog = blogsAtEnd.find((blog) =>
      blog.title.includes('Nothing before')
    );

    expect(addedBlog.likes).toEqual(0);
  });

  test('fails with status code 400 if title is not present', async () => {
    const newBlog = {
      author: 'Alhaan Hameed',
      url: 'https://alhaan-hameed.com/',
      likes: 90,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('fails with status code 400 if url is not present', async () => {
    const newBlog = {
      title: 'Dawn of the Justice',
      author: 'Alhaan Hameed',
      likes: 90,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('editing an existing blog', () => {
  test('succeeds with status code 200 and likes field is updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updateBlog = {
      likes: 199,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updateBlog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const likes = blogsAtEnd.map((blog) => blog.likes);

    expect(likes).toContain(updateBlog.likes);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('paika', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'anas',
      name: 'Muhammed Anas',
      password: 'lame',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with statuscode 400 if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'sh',
      name: 'Shabab Rahman',
      password: '######',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      `\`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3)`
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with statuscode 400 if password is invalid', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'shabab',
      name: 'Shabab Rahman',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password is required');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with statuscode 400 if password is less than 2 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'shabab',
      name: 'Shabab Rahman',
      password: '##',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'password must be at least 3 characters long'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
