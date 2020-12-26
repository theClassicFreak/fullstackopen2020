import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import PostForm from './components/PostForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

import Notification from './components/Notification'
const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorClass, setErrorClass] = useState('success')
  const postFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const postForm = () => (
    <Togglable buttonLabel="Create New Post" ref={postFormRef}>
      <PostForm
        postFormRef={postFormRef}
        user={user}
        setBlogs={setBlogs}
        blogService={blogService}
        setErrorClass={setErrorClass}
        setErrorMessage={setErrorMessage}
      />
    </Togglable>
  )
  const loginForm = () => (
    <LoginForm
      setUser={setUser}
      blogService={blogService}
      setErrorClass={setErrorClass}
      setErrorMessage={setErrorMessage}
    />
  )

  return (
    <div>
      <h2>Blog Page</h2>
      <Notification message={errorMessage} errorClass={errorClass} />
      {user === null ? (
        <div>{loginForm()}</div>
      ) : (
        <div>
          <p>
                        Logged In as {user.name}
            <button
              onClick={() => {
                window.localStorage.removeItem('loggedInUser')
                setUser(null)
              }}
            >
                            Log Out
            </button>
          </p>
          <div>
            {blogs
              .filter((item) => item.user.username === user.username)
              .sort((a, b) => (a.likes < b.likes ? 1 : -1))
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  setBlogs={setBlogs}
                  blogService={blogService}
                  setErrorClass={setErrorClass}
                  setErrorMessage={setErrorMessage}
                />
              ))}
          </div>
          {postForm()}
        </div>
      )}
    </div>
  )
}
export default App
