import { createSlice } from '@reduxjs/toolkit'

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
      return state.map((blog) => (blogToLike.id !== id ? blog : likedBlog))
    },
  },
})

export const { appendBlog, setBlogs, incrementLike } = blogSlice.actions
export default blogSlice.reducer
