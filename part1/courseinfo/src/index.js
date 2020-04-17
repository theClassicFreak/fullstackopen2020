import React from 'react'
import ReactDOM from 'react-dom'

const Header = (courseinfo) =>
{
  return (
    <div>
      <h1>
        {courseinfo.course}
      </h1>
    </div>
  )
}

const Part = (partinfo) =>
{
  return (
    <div>
        <p>
          {partinfo.part} : {partinfo.exercise}
        </p>
      </div>
  )
}

const Content = (contentinfo) =>
{
  return (
    <div>
    <Part part={contentinfo.parts[0].name} exercise={contentinfo.parts[0].exercises}/>
    <Part part={contentinfo.parts[1].name} exercise={contentinfo.parts[1].exercises}/>
    <Part part={contentinfo.parts[2].name} exercise={contentinfo.parts[2].exercises}/>
  </div>
  )
}

const Total = (totalinfo) =>
{

    let total_exercises = 0
    totalinfo.parts.forEach((item, i) =>
    {
      total_exercises += item.exercises
    })

  return (
    <div>
      <p>
        Total Exercises : {total_exercises}
      </p>
    </div>
  )
}

const App = () =>
{
  const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
