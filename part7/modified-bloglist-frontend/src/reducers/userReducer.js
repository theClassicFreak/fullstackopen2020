import loginService from '../services/login'
import storage from '../utils/storage'

export const handleLogin = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const handleLogout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    dispatch({
      type: 'INIT_USER'
    })
  }
}

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    storage.saveUser(action.data)
    return action.data
  case 'LOGOUT':
    storage.logoutUser()
    return null
  case 'INIT_USER':
    var currentUser = storage.loadUser()
    return currentUser
  default:
    currentUser = storage.loadUser()
    if (currentUser !== null)
      return currentUser
    else
      return state
  }
}

export default userReducer