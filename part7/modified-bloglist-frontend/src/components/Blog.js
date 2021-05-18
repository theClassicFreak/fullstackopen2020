import React, { useState, useEffect } from 'react'
import { handleLike, handleRemove, initializeBlogs } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const Blog = ({ blogs }) => {
  const [blogsToShow, setBlogsToShow] = useState(new Set())

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const likeBlog = (blog) => {
    dispatch(handleLike(blog))
  }

  const removeBlog = (id) => {
    dispatch(handleRemove(id))
  }

  const toggleVisibility = (id, toShow) => {
    if (!toShow) {
      blogsToShow.add(id)
    }
    else {
      blogsToShow.delete(id)
    }
    setBlogsToShow(new Set(blogsToShow)) // Set is mutable by nature, and React performs a shallow comparison when updating the component
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    blogs.sort(byLikes).map(blog => {
      var show = blogsToShow.has(blog.id)
      return (
        <div key={blog.id} style={blogStyle} className='blog'>
          <div>
            <i>{blog.title}</i> by {blog.author} <button onClick={() => toggleVisibility(blog.id, show)}>{show ? 'hide' : 'view'}</button>
          </div>
          {show&&(
            <div>
              <div>{blog.url}</div>
              <div>likes {blog.likes}
                <button onClick={() => likeBlog(blog)}>like</button>
              </div>
              <div>{blog.user.name}</div>
              {<button onClick={() => removeBlog(blog.id)}>remove</button>}
            </div>
          )}
        </div>
      )}
    ))
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const ConnectedBlog = connect(mapStateToProps)(Blog)
export default ConnectedBlog