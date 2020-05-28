import React from 'react'
const Notification = ({ message, errorClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={errorClass}>
      {message}
    </div>
  )
}
export default Notification
