import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { increaseVote} from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, filter, increaseVote, showNotification}) => {
  // const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(state.filter)))
  // const dispatch = useDispatch()
  const filteredAnecdotes = () => {
    if (filter === "") {
      return anecdotes
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
    }
    else {
      return anecdotes
        .filter(a => a.content.includes(filter))
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
      }
    }
  const vote = (anecdote) => {
    increaseVote(anecdote)
    showNotification(`you voted '${anecdote.content}'`, 10)
  }
  return (
    <div>
      <h2>Anecdote List</h2>
      {
        filteredAnecdotes()
        .map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} <button onClick={() => vote(anecdote)}>Votes</button>
          </div>
        </div>
      ))}
    </div>
  )
}

// export default AnecdoteList

const mapStateToProps = ({ anecdotes, filter }) => {
  return {
    anecdotes,
    filter,
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, {
  increaseVote,
  showNotification,
})(AnecdoteList)
export default ConnectedAnecdoteList
