import React,
{
  useState
}
from 'react'
import Course from './components/Course.js'



const App = (props) =>
{
  const [courses, setCourses] = useState([])
  const [newCourse, setNewCourse] = useState(
    'a new note...'
  )
  const addCourse = (event) =>
  {
    event.preventDefault()
    console.log('button clicked', event.target)
  }


  const all_courses = courses.map((course, index) =>
    <Course key={index} course={course} />
  )
  return (
    <div>
      {all_courses}
      <form onSubmit={addCourse}>
        <input value={newCourse} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
