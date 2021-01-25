import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(increaseVote(id))
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
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>Votes</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
