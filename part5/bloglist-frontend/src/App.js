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
  const [newTitle, setNewTitle] = useState('')
  const [newURL, setNewURL] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(`${user.name} has logged in`)
      setErrorClass('success')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
    catch (exception) {
      setErrorMessage('Wrong Credentials')
      setErrorClass('error')
      setTimeout(() => {
      setErrorMessage(null)}, 5000)
    }
  }
  const addPost = async (event) => {
    event.preventDefault()
    try {
      let postObject = {}
      postObject['title'] = newTitle
      postObject['author'] = newAuthor
      postObject['url'] = newURL
      const result = await blogService.create(postObject)
      setNewTitle('')
      setNewAuthor('')
      setNewURL('')
      blogService.getAll()
        .then(blogs => setBlogs(blogs))
      setErrorMessage(`${result.title} has been posted by ${user.name}`)
      setErrorClass('success')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
    catch (exception) {
      setErrorMessage('Could Not Create Blog Post')
      setErrorClass('failure')
      setTimeout(() => {
      setErrorMessage(null)}, 5000)
    }
  }
  const handlePostChange = (event) => {
    switch (event.target.name) {
      case "title":
        setNewTitle(event.target.value)
        break;
      case "author":
        setNewAuthor(event.target.value)
        break;
      case "url":
        setNewURL(event.target.value)
        break;
      default:
        break;
    }
  }
  const postForm = () => (<div>
    <form onSubmit={addPost}>
      <div>
        <p>Title
          <input
            name="title"
            value={newTitle}
            onChange={handlePostChange}
          />
        </p>
      </div>
      <div>
        <p>Author
          <input
            name="author"
            value={newAuthor}
            onChange={handlePostChange}
          />
        </p>
      </div>
      <div>
        <p>URL
          <input
            name="url"
            value={newURL}
            onChange={handlePostChange}
          />
        </p>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>)
  const loginForm = () => (<form onSubmit={handleLogin}>
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
  </form>)
  return (<div>
    <h2>Blog Page</h2>
    <Notification message={errorMessage} errorClass={errorClass} />
    {user === null ?
      loginForm() :
      <div>
        <p>Logged In as {user.name}
          <button onClick={() => {
            window.localStorage.removeItem('loggedInUser')
            setUser(null)
          }
          }>
            Log Out
          </button>
        </p>
        <div>
          {blogs
            .filter((item) => item.user.username === user.username)
            .map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
        </div>
        {postForm()}
      </div>
    }
  </div>)
}
export default App
