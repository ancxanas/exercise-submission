import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog, createComment } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const Blog = () => {
  const user = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blog)

  const [content, setContent] = useState('')

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const dispatch = useDispatch()

  const navigate = useNavigate()

  if (!blog) return null

  const like = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(
      setNotification({
        message: `liked the blog ${blog.title} by ${blog.author}`,
        severity: 'success',
      })
    )
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      dispatch(
        setNotification({
          message: `${blog.title} by ${blog.author} deleted`,
          severity: 'error',
        })
      )
      navigate('/')
    }
  }

  const addComment = (event) => {
    event.preventDefault()

    const comment = {
      content,
    }

    dispatch(createComment(blog.id, comment))

    setContent('')
  }

  return (
    <Box sx={{ minHeight: '100vh' }} className="blog">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h2" color="primary.main">
          {blog.title} {blog.author}
        </Typography>
      </Box>

      <Grid
        sx={{ p: 3 }}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <a href={blog.url}>
          <Typography color="primary.main">{blog.url}</Typography>
        </a>

        <Box display="flex">
          <Typography color="primary.main">{blog.likes} likes</Typography>
          <Button variant="outlined" sx={{ p: 0 }} onClick={() => like(blog)}>
            like
          </Button>
        </Box>

        <Typography color="primary.main">added by {blog.user.name}</Typography>
        {blog.user.username === user.username ? (
          <Button variant="outlined" size="small" onClick={handleRemove}>
            remove
          </Button>
        ) : null}
      </Grid>
      <Grid sx={{ p: 1 }}>
        <Box sx={{ my: 1 }}>
          <Typography variant="h3" color="primary.main">
            comments
          </Typography>
        </Box>
        <form onSubmit={addComment}>
          <Box display="flex">
            <TextField
              id="comment-input"
              multiline
              maxRows="2"
              type="text"
              value={content}
              name="comment"
              size="small"
              onChange={({ target }) => setContent(target.value)}
            />
            <Button variant="outlined" size="small" type="submit">
              <Typography>add comment</Typography>
            </Button>
          </Box>
        </form>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          {blog.comments.map((comment) => (
            <ListItem
              sx={{ display: 'list-item', color: 'primary.main' }}
              key={comment.id}
            >
              {comment.content}
            </ListItem>
          ))}
        </List>
      </Grid>
    </Box>
  )
}

export default Blog
