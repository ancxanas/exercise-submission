require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

morgan.token('body', (request, response) => JSON.stringify(request.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blog) => response.json(blog));
});

app.post('/api/blogs', (request, response) => {
  const blog = request.body;

  bloglist = bloglist.concat(blog);
  response.json(blog);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
