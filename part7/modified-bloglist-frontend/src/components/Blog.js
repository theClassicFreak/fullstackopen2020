import React, { useState, useEffect } from 'react'
import { handleLike, handleRemove, initializeBlogs } from '../reducers/blogReducer'
import { initializeUser, handleLogout } from '../reducers/userReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const Blog = ({ blogs, users, loggedinStateHandler }) => {
  const [blogsToShow, setBlogsToShow] = useState(new Set())

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  const likeBlog = (blog) => {
    dispatch(handleLike(blog))
    dispatch(showNotification('Liked '+blog.title, 'success'))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  const removeBlog = (blog) => {
    dispatch(handleRemove(blog.id))
    dispatch(showNotification('Removed '+blog.title, 'success'))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
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

  const callLogout = async (event) => {
    event.preventDefault()
    loggedinStateHandler(false)
    await dispatch(handleLogout())
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const UserHeader = () => {
    return(
      <div>
        <p>
          {users.username} logged in <button onClick={callLogout}>logout</button>
        </p>
      </div>
    )
  }

  const ListOfBlogs = () => {
    return(
      blogs.sort(byLikes).map(blog => {
        var show = blogsToShow.has(blog.id)
        var own = users.username===blog.user.username
        if (!own)
          return
        else {
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
                  {<button onClick={() => removeBlog(blog)}>remove</button>}
                </div>
              )}
            </div>
          )
        }
      }
      )
    )
  }

  return (
    <div>
      <UserHeader/>
      <ListOfBlogs/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users
  }
}

const ConnectedBlog = connect(mapStateToProps)(Blog)
export default ConnectedBlog