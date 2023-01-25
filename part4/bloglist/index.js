require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const Blog = require('./models/blog');

morgan.token('body', (request) => JSON.stringify(request.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blog) => response.json(blog));
});

app.post('/api/blogs', (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((savedBlog) => response.json(savedBlog))
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
