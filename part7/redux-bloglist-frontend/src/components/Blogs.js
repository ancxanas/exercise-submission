import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const user = useSelector((state) => state.login)

  const blogFormRef = useRef()

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList user={user} />
    </>
  )
}

export default Blogs
