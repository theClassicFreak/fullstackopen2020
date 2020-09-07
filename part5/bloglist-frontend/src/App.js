import React, {
  useState,
  useEffect
}
from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorClass, setErrorClass] = useState('success')
  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const postForm = () => (
    <div>
    </div>
    // <form onSubmit={addPost}>
    //   <input
    //     value={newPost}
    //     onChange={handlePostChange}
    //   />
    //   <button type="submit">save</button>
    // </form>
  )
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div> username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div> password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  return (<div>
    <h2>Blog Page</h2>
    {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        <p>
          {blogs
            .filter((item) => item.user.username === user.username)
            .map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </p>
        {postForm()}
      </div>
    }
  </div>)
}
export default App
