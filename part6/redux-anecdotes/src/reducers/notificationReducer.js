export const showNotification = notifications => {
  return {
    type: 'SHOW',
    data: { notifications }
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW': {
      return action.data.notifications
    }
    case 'HIDE': return ''
    default: return state
  }
}

export default reducer
