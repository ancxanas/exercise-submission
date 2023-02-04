const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'What the Heck Is World?',
    author: 'Dolly Mary Jones',
    url: 'https://www.temporary-url.com/',
    likes: 100,
  },
  {
    title: 'The Fundamental idiology of intraspectular cosmos',
    author: 'Ramesh Pisharadi',
    url: 'https://ramesh-pisharadi.com',
    likes: 876,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
