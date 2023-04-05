import { Grid, List, ListItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = () => {
  const users = useSelector((state) => state.user)

  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) return null

  return (
    <>
      <Grid container direction="column">
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color="primary.main">
            {user.name}
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h3" color="primary.main">
            added blogs
          </Typography>
          <List
            sx={{
              listStyleType: 'disc',
              pl: 4,
            }}
          >
            {user.blogs.map((blog) => (
              <ListItem
                sx={{
                  display: 'list-item',
                  color: 'primary.main',
                }}
                key={blog.id}
              >
                {blog.title}
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </>
  )
}

export default User
