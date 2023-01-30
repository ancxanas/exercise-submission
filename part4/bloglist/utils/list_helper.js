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
    delete currentValue._id, delete currentValue.__v, delete currentValue.url;
    return accumulator.likes > currentValue.likes ? accumulator : currentValue;
  }, {});
};

module.exports = { dummy, totalLikes, favoriteBlog };
