const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the first blog is by Thatsme Dotcom', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].author).toBe('Thatsme Dotcom')
})

test('number of blogs is 3', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body._id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})
