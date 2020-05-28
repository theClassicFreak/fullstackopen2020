import React from 'react'
const Person = ({results, delPerson}) => {
  return (results.map(person =>
    <p key={person.id}>{person.name}:{person.number} <button
        name = "delete"
        value = {person.id}
        onClick={delPerson}> Delete </button></p>
  ))
}
export default Person
