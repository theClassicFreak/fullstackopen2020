export const showNotification = (notification, delay) => dispatch => {
    dispatch({
      type: 'SHOW',
      data: {notification}
    })
    setTimeout(() => {
      dispatch(hideNotification());
    }, 1000*delay);
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW': {
      return action.data.notification
    }
    case 'HIDE': {
      return ''
    }
    default: return state
  }
}

export default notificationReducer
