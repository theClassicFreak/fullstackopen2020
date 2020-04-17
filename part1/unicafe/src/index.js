import React,
{
  useState
}
from 'react'
import ReactDOM from 'react-dom'

const App = () =>
{
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodReviews = () =>
  {
    return setGood(good + 1)
  }
  const addNeutralReviews = () =>
  {
    return setNeutral(neutral + 1)
  }
  const addBadReviews = () =>
  {
    return setBad(bad + 1)
  }


  return (
    <div>
      <Feedback />
      <Button handleClick={addGoodReviews} text='Good' />&nbsp;
      <Button handleClick={addNeutralReviews} text='Neutral' />&nbsp;
      <Button handleClick={addBadReviews} text='Bad' />
      <Statistics counts={[good, neutral, bad]} />
    </div>
  )
}

const Feedback = () =>
{
  return (
    <div>
      <h1>Give Feedback</h1>
    </div>
  )
}

const Statistics = (props) =>
{
  let total = props.counts[0] + props.counts[1] + props.counts[2]
  let avg = 0,
    good_feedback = 0,
    neutral_feedback = 0,
    bad_feedback = 0
  if (total > 0)
  {
    good_feedback = (props.counts[0] / total) * 100
    neutral_feedback = (props.counts[1] / total) * 100
    bad_feedback = (props.counts[2] / total) * 100
    avg = ((1 * good_feedback) + (0 * neutral_feedback) + (-1 * bad_feedback)) / 100
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
          <Statistic text="Good" value={props.counts[0]}/>
          <Statistic text="Neutral" value={props.counts[1]}/>
          <Statistic text="Bad" value={props.counts[2]}/>
          <Statistic text="Total" value={total}/>
          <Statistic text="Average" value={avg}/>
          <Statistic text="Positive" value={good_feedback}/>
          </tbody>
        </table>
      </div>
    )
  }
  else
  {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No Feedback Given</p>
      </div>
    )
  }
}

const Statistic = (
{
  text,
  value
}) =>
{
  return (
    <tr>
        <td>{text}</td>
        <td>{value}{text==="Positive"?"%":""}</td>
      </tr>
  )

}


const Button = (props) =>
{
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
)
