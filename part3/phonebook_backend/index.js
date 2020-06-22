const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const morgan = require('morgan')
app.use(express.static('build'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
    },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
    },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
    },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
    }
]
const generateId = () => {
  const maxId = Math.floor(Math.random() * Math.floor(512));
  return maxId
}
app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.name) {
    return response.status(400)
      .json({
        error: 'name is missing'
      })
  }
  else if(!body.number) {
    return response.status(400)
      .json({
        error: 'number is missing'
      })
  }
  let nameMatch = persons.find((person) => person.name === body.name)
  let numberMatch = persons.find((person) => person.number === body.number)
  if(nameMatch !== undefined && numberMatch !== undefined) {
    return response.status(400)
      .json({
        error: nameMatch.name + ', ' + numberMatch.number + ' is already added to phonebook'
      })
  }
  else if(nameMatch === undefined && numberMatch !== undefined) {
    return response.status(400)
      .json({
        error: numberMatch.number + ' is already added to phonebook'
      })
  }
  else if(nameMatch !== undefined && numberMatch === undefined) {
    return response.status(400)
      .json({
        error: nameMatch.name + ' is already added to phonebook'
      })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  persons = persons.concat(person)
  response.json(person)
})
app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/api/info', (req, res) => {
  let count = persons.length
  let date = new Date()
  res.send('<p>Phonebook has info for ' + count + '</p><p>' + date + '</p>')
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    response.json(person)
  }
  else {
    response.status(404)
      .end()
  }
  response.json(person)
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    persons = persons.filter(person => person.id !== id)
    response.status(204)
      .end()
  }
  else {
    response.status(404)
      .end()
  }
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
