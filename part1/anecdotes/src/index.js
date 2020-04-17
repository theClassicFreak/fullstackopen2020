import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const voteArray = [...votes]

  const selectRandom = () => {
    const randomElement = Math.floor(Math.random() * anecdotes.length)
    return(setSelected(randomElement))
  }

  const addVotes = () => {
    voteArray[selected] += 1
    return(setVotes(voteArray))
  }

  return (
    <div>
      <h1> Anecdote of the day: </h1>
      <p>{props.anecdotes[selected]} </p>
      <p> This quote has {voteArray[selected]} votes</p>
      <p>
      <Button handleClick={addVotes} text='Vote' />&nbsp;
      <Button handleClick={selectRandom} text='Next Anecdote' />
      </p>
      <h1> Anecdote with most votes: </h1>
      <MostVotes voteArray={voteArray}/>
    </div>
  )
}

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
}

const MostVotes = (props) => {
  let highest = props.voteArray.indexOf(Math.max(...props.voteArray))
  return(
  <p>{anecdotes[highest]}</p>
)
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
