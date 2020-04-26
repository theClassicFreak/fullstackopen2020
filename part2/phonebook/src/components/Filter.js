import React from 'react'
const Filter = (props) => {
  return (
    <div>
      <p>Filter names with : </p>
      <input
        name = "search"
        value = {props.searchKey}
        onChange={props.handleFormInput}/>
    </div>
  )
}
export default Filter
