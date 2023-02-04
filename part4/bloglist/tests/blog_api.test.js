const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'What the Heck Is World?',
    author: 'Dolly Mary Jones',
    url: 'https://www.temporary-url.com/',
    likes: 100,
    id: '63d14a4243772dd0ddeb12b4',
  },
  {
    title: 'The Fundamental idiology of intraspectular cosmos',
    author: 'Ramesh Pisharadi',
    url: 'https://ramesh-pisharadi.com',
    likes: 876,
    id: '63d155bcc51690c0f474d898',
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two notes', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('the first note is about world', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain('What the Heck Is World?');
});

afterAll(async () => {
  await mongoose.connection.close();
});
