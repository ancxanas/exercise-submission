import { useRef } from 'react'
import Togglable from '../Togglable/Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import './Blogs.css'

const Blogs = () => {
  const blogFormRef = useRef()

  return (
    <>
      <h1 className="blogs-title">Blogs</h1>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </>
  )
}

export default Blogs
