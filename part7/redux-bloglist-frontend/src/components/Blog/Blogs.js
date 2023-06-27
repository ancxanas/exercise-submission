import { useRef } from 'react'
import Togglable from '../Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Blogs = () => {
  const blogFormRef = useRef()

  return (
    <>
      Blogs
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </>
  )
}

export default Blogs
