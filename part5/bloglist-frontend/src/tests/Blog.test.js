import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'

const blog = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'www.test.url',
  likes: 100,
  user: 1234
}

afterEach(cleanup)

test('renders default content', () => {
  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.blogDefault')
  const verdict = (
    expect(div).toHaveTextContent('Test Title') &&
      expect(div).toHaveTextContent('Test Author') &&
      !(
        expect(div).toHaveTextContent('www.test.url') ||
          expect(div).toHaveTextContent('100')
      )
  )
  return verdict
})

test('renders expanded content on click', () => {
  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)
  const div = component.container.querySelector('.blogExpanded')
  const verdict = (
    expect(div).toHaveTextContent('Test Title') &&
      expect(div).toHaveTextContent('Test Author') &&
      expect(div).toHaveTextContent('www.test.url') &&
      expect(div).toHaveTextContent('100')
  )
  return verdict
})

test('clicking the like button twice causes handle to be called twice', () => {
  blogService.update = jest.fn()
  const component = render(
    <Blog blog={blog} blogService={blogService}/>
  )
  const viewBtn = component.getByText('View')
  fireEvent.click(viewBtn)
  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(blogService.update).toHaveBeenCalledTimes(2);
})