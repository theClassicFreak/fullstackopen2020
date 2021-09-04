import React, { useEffect, useState } from 'react'
import storage from './utils/storage'
import ConnectedBlog from './components/Blog'
import ConnectedNotification from './components/Notification'
import Login from './components/Login'

const App = () => {

  const [isLoggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const loggedinStateHandler = (loginState) => {
    setLoggedIn(loginState)
  }

  useEffect(() => {
    setCurrentUser(storage.loadUser())
  }, [])

  if (currentUser !== null || isLoggedIn) {
    return (
      <div>
        <ConnectedNotification />
        My Blog App
        {/* <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
          <NewBlog />
        </Togglable> */}
        <ConnectedBlog loggedinStateHandler={loggedinStateHandler}/>
      </div>
    )
  }
  else{
    return (
      <Login loggedinStateHandler={loggedinStateHandler}/>
    )
  }
}

export default App
