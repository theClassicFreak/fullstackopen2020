import React, { useState } from 'react'
import { handleLogin } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const Login = ({ loggedinStateHandler }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const callLogin = async (event) => {
    event.preventDefault()
    dispatch(handleLogin(username, password)).then(() => {loggedinStateHandler(true)})
  }

  return (
    <div>
        Log In
      <form onSubmit={callLogin}>
        <div>
            username
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login'>login</button>
      </form>
    </div>
  )
}

export default Login