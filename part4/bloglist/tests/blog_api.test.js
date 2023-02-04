const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs');

  const id = response.body.map((r) => r.id);
  expect(id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Dark: The path to light',
    author: 'Ahmed Khan',
    url: 'https://www.ahmedcha.com/',
    likes: 106,
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

test('blog without likes will be defaulted to zero', async () => {
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

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Alhaan Hameed',
    url: 'https://alhaan-hameed.com/',
    likes: 90,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Dawn of the Justice',
    author: 'Alhaan Hameed',
    likes: 90,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
