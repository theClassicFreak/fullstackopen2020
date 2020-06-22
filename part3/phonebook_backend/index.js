require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.use(cors())

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
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
})
app.put('/api/persons/:id', (request, response, next) => {
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
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})
app.get('/api/info', (request, response, next) => {
  Person.find({}).then(persons => {
    let count = persons.length
    let date = new Date()
    response.send('<p>Phonebook has info for ' + count + '</p><p>' + date + '</p>')
  })
})
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if(person){
      response.json(person)
    }
    else{
      response.status(404).end()
    }
  })
  .catch(error=>next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(request.params.id)
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
