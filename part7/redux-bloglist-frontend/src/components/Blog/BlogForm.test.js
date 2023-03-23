import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('when a new blog is submitted, event handler is called', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('add title')
  const author = screen.getByPlaceholderText('add author')
  const url = screen.getByPlaceholderText('add url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'Titanic')
  await user.type(author, 'James Cameroon')
  await user.type(url, 'https://titanic.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Titanic')
  expect(createBlog.mock.calls[0][0].author).toBe('James Cameroon')
  expect(createBlog.mock.calls[0][0].url).toBe('https://titanic.com')
})
