const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((accumulator, currentValue) => {
    return accumulator.likes > currentValue.likes
      ? {
          author: accumulator.author,
          likes: accumulator.likes,
          title: accumulator.title,
        }
      : {
          author: currentValue.author,
          likes: currentValue.likes,
          title: currentValue.title,
        };
  }, {});
};

const mostBlogs = (blogs) => {
  return _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({
      author: key,
      blogs: _.size(value),
    }))
    .maxBy((value) => value.blogs)
    .value();
};

const mostLikes = (blogs) => {
  return _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({
      author: key,
      likes: _.sum(value.map((value) => value.likes)),
    }))
    .maxBy((value) => value.likes)
    .value();
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
