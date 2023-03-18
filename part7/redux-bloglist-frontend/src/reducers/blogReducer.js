import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

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
    filterAfterDelete(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
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

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
    } catch (error) {
      dispatch(setNotification(error.response.data.error))
    }
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
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(filterAfterDelete(blog.id))
  }
}

export default blogSlice.reducer
