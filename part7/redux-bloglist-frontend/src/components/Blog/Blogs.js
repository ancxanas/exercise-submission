import { useRef } from 'react'
import Togglable from '../Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import { Typography } from '@mui/material'

const Blogs = () => {
  const blogFormRef = useRef()

  return (
    <>
      <Typography sx={{ p: 1 }} variant="h2" color="primary.main">
        Blogs
      </Typography>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </>
  )
}

export default Blogs
