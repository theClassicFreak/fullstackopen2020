import React from 'react'

const Header = (
{
  course
}) =>
{
  return (
    <h1>{course.name}</h1>
  )
}

const Total = (
{
  course
}) =>
{
  const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p><b>Total of {sum} exercises</b></p>
  )
}

const Part = (props) =>
{
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = (
{
  course
}) =>
{
  const content_parts = course.parts.map((part, index) =>
    <Part key={index} part={part} index={index} />
  )
  return <div>{content_parts}</div>
}


const Course = (
{
  course
}) =>
{
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course
