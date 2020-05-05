import React from 'react'
const Filter = (props) => {
  return (<div>
    <p>Find Countries: </p>
    <input
      name = "search"
      value = {props.searchKey}
      onChange={props.handleFormInput}
    />
    <p>List Of Countries</p>
  </div>)
}
export default Filter
