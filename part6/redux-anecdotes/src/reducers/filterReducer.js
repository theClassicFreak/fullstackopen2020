export const setFilter = filter => {
  return {
    type: 'FILTER',
    data: { filter }
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER': return action.data.filter
    default: return state
  }
}

export default filterReducer
