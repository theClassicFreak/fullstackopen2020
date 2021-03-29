export const showNotification = (notification, delay) => dispatch => {
    dispatch({
      type: 'SHOW',
      data: {notification,
      delay: setTimeout(() => {
          dispatch(hideNotification());
        }, 1000*delay)
      }
    })
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW': {
      clearTimeout(state.delay)
      return action.data.notification
    }
    case 'HIDE': {
      return ''
    }
    default: return state
  }
}

export default notificationReducer
