import Blog from './Blog';

const BlogList = ({ blogs, updatedObject }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updatedLike={updatedObject} />
      ))}
    </div>
  );
};

export default BlogList;
