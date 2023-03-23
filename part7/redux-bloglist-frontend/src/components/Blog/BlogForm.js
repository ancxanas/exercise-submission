import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    dispatch(createBlog(newBlog))
    dispatch(
      setNotification({
        severity: 'success',
        message: `Blog ${newBlog.title} by ${newBlog.author} added`,
      })
    )
    blogFormRef.current.toggleVisibility()

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Box sx={{ m: 1 }}>
        <Typography variant="h2">create new</Typography>
      </Box>

      <form onSubmit={addBlog}>
        <Box sx={{ m: 1 }}>
          <TextField
            id="title"
            type="text"
            name="title"
            value={title}
            label="title"
            size="small"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <TextField
            id="author"
            type="text"
            value={author}
            name="author"
            label="author"
            size="small"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <TextField
            id="url"
            type="url"
            value={url}
            name="url"
            label="url"
            size="small"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <Button
            size="small"
            variant="outlined"
            id="create-button"
            type="submit"
          >
            create
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default BlogForm
