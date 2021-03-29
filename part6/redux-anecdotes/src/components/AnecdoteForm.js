import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote} from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createAnecdote, showNotification}) => {
  // const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value=''
    // dispatch(createAnecdote(content))
    createAnecdote(content)
    // dispatch(showNotification(`you created '${content}'`, 10))
    showNotification(`you created '${content}'`, 10)
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>Create</button>
      </form>
    </div>
  )
}

// export default AnecdoteForm
const ConnectedAnecdoteForm = connect(
  null, {
    createAnecdote, showNotification
  })
  (AnecdoteForm)
export default ConnectedAnecdoteForm
