import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, blogService, setErrorClass, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    // let isSubscribed = true
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
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setErrorClass('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        {' '}
                username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        {' '}
                password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default LoginForm
