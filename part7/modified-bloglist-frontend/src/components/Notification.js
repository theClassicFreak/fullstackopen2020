import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if ( !notification ) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.verdict === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return <div style={style}>
    {notification.content}
  </div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification