import { useState } from 'react';

const Blog = ({ blog, updatedLike }) => {
  const [show, setShow] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const incrementLike = () => {
    updatedLike({ ...blog, likes: (blog.likes += 1) });
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'view'}</button>
      {show && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={incrementLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
