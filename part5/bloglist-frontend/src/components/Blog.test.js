import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title and author of the blog by default', () => {
  const blog = {
    title: 'Titanic',
    author: 'James Cameroon',
    likes: 0,
    url: 'https://titanic.com/',
  }

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
  const blog = {
    title: 'Titanic',
    author: 'James Cameroon',
    likes: 0,
    url: 'https://titanic.com/',
    user: {
      name: 'James',
      username: 'james',
    },
  }

  const userObject = {
    username: 'james',
  }

  render(<Blog blog={blog} user={userObject} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeElement = screen.getByText('likes 0')
  const urlElement = screen.getByText('https://titanic.com/')

  expect(likeElement).toBeDefined()
  expect(urlElement).toBeDefined()
})
