import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import PostForm from '../components/PostForm'
import blogService from '../services/blogs'


const post = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'www.test.url'
}

afterEach(cleanup)

test('calls the event handler with the right details', () => {
  blogService.create = jest.fn()
  const setBlogs = jest.fn()
  const setErrorMessage = jest.fn()
  const setErrorClass = jest.fn()
  const postFormRef = jest.fn()
  const component = render(
    <PostForm blogService={blogService} setBlogs={setBlogs} setErrorMessage={setErrorMessage} setErrorClass={setErrorClass} postFormRef={postFormRef} />
  )
  
  const title = component.container.querySelector('input[name="title"]')
  const author = component.container.querySelector('input[name="author"]')
  const url = component.container.querySelector('input[name="url"]')
  fireEvent.change(title, {
    target: { value: 'test title' }
  })
  fireEvent.change(author, {
    target: { value: 'test author' }
  })
  fireEvent.change(url, {
    target: { value: 'www.testurl.com' }
  })

  const button = component.getByText('Create')
  fireEvent.click(button)

  expect(blogService.create).toHaveBeenCalledTimes(1)
  expect((blogService.create).mock.calls[0][0].title).toBe('test title' )
})