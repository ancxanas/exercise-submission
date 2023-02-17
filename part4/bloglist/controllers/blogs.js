const blogsRouter = require('express').Router();
const { isValidObjectId } = require('mongoose');
const Blog = require('../models/blog');
const userExtractor = require('../utils/middleware').userExtractor;

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  if (!isValidObjectId(request.params.id)) {
    return response.status(400).end();
  }

  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  let savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  savedBlog = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1,
  });

  response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(blog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).json({ error: 'invalid user' });
  }
});

module.exports = blogsRouter;
