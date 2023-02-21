import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author of the blog', () => {
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
