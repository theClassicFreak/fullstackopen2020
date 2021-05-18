export const showNotification = (content, verdict) => {
  return {
    type: 'SHOW',
    data : {
      content,
      verdict
    }
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

const notificationReducer = (state = '', action) => {
  switch(action.type) {
  case 'SHOW': {
    return action.data
  }
  case 'HIDE': {
    return ''
  }
  default: return state
  }
}

export default notificationReducer
