import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Note />', () => {
  let blog, userObject

  beforeEach(() => {
    blog = {
      title: 'Titanic',
      author: 'James Cameroon',
      likes: 0,
      url: 'https://titanic.com/',
      user: {
        name: 'James',
        username: 'james',
      },
    }

    userObject = {
      name: 'James',
      username: 'james',
    }
  })

  test('renders only title and author of the blog by default', () => {
    render(<Blog blog={blog} />)

    const titleAndAuthorElement = screen.getAllByText('Titanic James Cameroon')
    const likesElement = screen.queryByText('likes 0', { exact: false })
    const urlElement = screen.queryByText('https://titanic.com/', {
      exact: false,
    })

    expect(titleAndAuthorElement).toBeDefined()
    expect(likesElement).toBeNull()
    expect(urlElement).toBeNull()
  })

  test('renders likes and url of the blog when view is pressed', async () => {
    render(<Blog blog={blog} user={userObject} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeElement = screen.getByText('likes 0')
    const urlElement = screen.getByText('https://titanic.com/')

    expect(likeElement).toBeDefined()
    expect(urlElement).toBeDefined()
  })

  test('clicking like button twice triggers the event handler twice', async () => {
    const updatedLike = jest.fn()

    render(<Blog blog={blog} user={userObject} updatedLike={updatedLike} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.dblClick(likeButton)

    expect(updatedLike.mock.calls).toHaveLength(2)
  })
})
