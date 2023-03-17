import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('return a new state with action blog/incrementLike', () => {
    const state = [
      {
        id: 1,
        title: 'Harry Potter',
        author: 'J. K. Rowling',
        url: 'https://www.titanic.com',
        likes: 0,
      },
    ]

    const action = {
      type: 'blog/incrementLike',
      payload: {
        id: 1,
      },
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toContainEqual({
      id: 1,
      title: 'Harry Potter',
      author: 'J. K. Rowling',
      url: 'https://www.titanic.com',
      likes: 1,
    })
  })
})
