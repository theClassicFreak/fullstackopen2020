import React from 'react'
const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        <p>Name : </p>
        <input
          name = "personName"
          value = {props.newName}
          onChange={props.handleFormInput}/>
      </div>
      <div>
        <p>Number : </p>
        <input
          name = "personNumber"
          value = {props.newNumber}
          onChange={props.handleFormInput}/>
      </div>
      <p></p>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}
export default PersonForm
