import axios from 'axios'

const baseUrl = 'http://192.168.56.101:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (content, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...content,
    votes: content.votes+1
  })
  return response.data
}

export default { getAll, createNew, voteAnecdote }
