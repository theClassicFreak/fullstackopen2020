import React from 'react'
const Person = ({results}) => {
  return (results.map(person =>
    <p key={person.number}>{person.name}:{person.number}</p>))
}
export default Person
