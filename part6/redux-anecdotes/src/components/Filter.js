import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({setFilter}) => {
// const dispatch = useDispatch()

const handleChange = e => {
  setFilter(e.target.value)
}
const style = {
  marginBottom: 10
}

return (
  <div style={style}>
    filter <input onChange={handleChange} />
  </div>
)
}

const ConnectedFilter = connect(null, { setFilter })(Filter);
export default ConnectedFilter;
