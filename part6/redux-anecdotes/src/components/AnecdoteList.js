import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote} from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(state.filter)))
  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(increaseVote(anecdote))
    dispatch(showNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      <h2>Anecdote List</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} <button onClick={() => vote(anecdote)}>Votes</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
