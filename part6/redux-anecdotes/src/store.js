import { createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
// import thunk from "redux-thunk"

import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer";
// import requestReducer from "./reducers/requestReducer";

import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
anecdotes: anecdoteReducer,
notifications: notificationReducer,
filter: filterReducer
// requests: requestReducer,
});

const store = createStore(reducer, composeWithDevTools())

anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(anecdote => {
    store.dispatch({ type: 'NEW_ANECDOTE', data: anecdote })
  })
)

export default store
