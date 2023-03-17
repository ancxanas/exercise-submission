import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    incrementLike(state, action) {
      const id = action.payload.id
      const blogToLike = state.find((blog) => blog.id === id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      }
      return state
        .map((blog) => (blog.id !== id ? blog : likedBlog))
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
    },
  },
})

export const { appendBlog, setBlogs, incrementLike, filterAfterDelete } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(incrementLike(updatedBlog))
  }
}

export const deleteBlog = (blog) => {
  console.log(blog)
  return async () => {
    await blogService.remove(blog.id)
  }
}

export default blogSlice.reducer
