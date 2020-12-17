import React, { useState } from 'react'
const Blog = ({ blog, blogService, setBlogs, setErrorClass, setErrorMessage }) => {
  const [showExpandedView, setExpandedView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleView = () => {
    setExpandedView(!showExpandedView)
  }

  const deletePost = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm('Delete ' + blog.title + ' ? ')) {
        await blogService.remove(blog.id)
        setBlogs(await blogService.getAll())
      }
    } catch (exception) {
      setErrorMessage('Could Not Update Blog Post')
      setErrorClass('failure')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const increaseLikes = async (event) => {
    event.preventDefault()
    try {
      let postObject = {}
      postObject['user'] = blog.id
      postObject['title'] = blog.title
      postObject['author'] = blog.author
      postObject['url'] = blog.url
      postObject['likes'] = blog.likes + 1
      await blogService.update(blog.id, postObject)
      setBlogs(await blogService.getAll())
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Could Not Update Blog Post')
      setErrorClass('failure')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {showExpandedView === true ? (
        <div style={blogStyle} className='blogExpanded'>
          <p>
            {blog.title} {blog.author}
            <button onClick={toggleView}> Hide </button>
          </p>
          <p>{blog.url}</p>
          <p>
            {blog.likes} <button onClick={increaseLikes}> Like </button>{' '}
          </p>
          <p>{blog.user.name}</p>
          <p>
            <button onClick={deletePost}> Delete </button>
          </p>
        </div>
      ) : (
        <div style={blogStyle} className='blogDefault'>
          <p>
            {blog.title} {blog.author}
            <button onClick={toggleView}> View </button>
          </p>
        </div>
      )}
    </div>
  )
}

export default Blog