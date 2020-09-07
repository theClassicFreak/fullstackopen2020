const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = {
    username: 'testuser',
    name: 'Test User',
    password: 'secret'
  }
  var result = await api.post('/api/users')
    .send(user)
})

describe('when there is one user in DB', () => {
  test('a valid user is added to DB', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: 'seconduser',
      name: 'Second User',
      password: 'secret',
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(user.username)
  })

  test('creation fails when username already exists in the DB', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: 'testuser',
      name: 'New User',
      password: 'shadypassword',
    }
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('`username` to be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails when password/username is too short', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: 'ab',
      password: 'abcd'
    }
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('username must be at least 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
    const secondUser = {
      username: 'abcd',
      password: 'ab'
    }

    const secondResult = await api
      .post('/api/users')
      .send(secondUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    expect(secondResult.body.error).toContain('password must be at least 3 characters long')
    const usersAtVeryEnd = await helper.usersInDb()
    expect(usersAtVeryEnd.length).toBe(usersAtEnd.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
