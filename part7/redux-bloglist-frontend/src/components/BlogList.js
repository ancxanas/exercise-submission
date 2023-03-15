import Blog from './Blog'

const BlogList = ({ blogs, user, updatedBlog, removeBlog }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          updatedLike={updatedBlog}
          deleteBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default BlogList
