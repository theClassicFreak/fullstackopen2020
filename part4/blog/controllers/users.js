const bcrypt = require('bcrypt')
const userRouter = require('express')
  .Router()
const User = require('../models/user')

userRouter.post('/', async (request, response,next) => {
  const body = request.body
  if(body.username.length < 3) {
    return response.status(401)
      .json({
        error: 'username must be at least 3 characters long',
      })
  }
  if(body.password.length < 3) {
    return response.status(401)
      .json({
        error: 'password must be at least 3 characters long',
      })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  const savedUser = await user.save().catch(error => next(error))
  response.status(200).json(savedUser)
})

userRouter.get('/', async (request, response, next) => {
  const users = await User.find({})
    .populate('blogs').catch(error => next(error))
  response.json(users.map((user) => user.toJSON()))
})

module.exports = userRouter
