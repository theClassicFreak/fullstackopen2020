const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
var token = null
beforeEach(async () => {
  await Blog.deleteMany({})
  for(let blog of helper.sampleBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
  await User.deleteMany({})
  const user = {
    username: 'testuser',
    name: 'Test User',
    password: 'secret'
  }
  var result = await api.post('/api/users')
    .send(user)
  const userForToken = {
    username: user.username,
    id: result.body._id,
  }
  const logininfo = {
    username: 'testuser',
    password: 'secret'
  }
  result = await api.post('/api/login')
    .send(logininfo)
  token = result.body.token
})
describe('GET requests', () => {
  test('blogs are returned as JSON', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length)
      .toBe(helper.sampleBlogs.length)
  })
  test('all blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id)
      .toBeDefined()
  })
})
describe('POST requests', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: '1st blog',
      author: 'Test User',
      url: '1st url',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .set('authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length)
      .toBe(helper.sampleBlogs.length + 1)
  })
  test('if missing, likes defaults to 0', async () => {
    const newBlog = {
      title: '3rd blog',
      author: 'Test User',
      url: '2nd url',
    }
    await api.post('/api/blogs')
      .set('authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    const newlyAdded = blogsAtEnd.find(blog => blog.title === '3rd blog')
    expect(newlyAdded.likes)
      .toBe(0)
  })
  test('blogs without title/author arent added with status 400', async () => {
    const blogWithoutTitle = {
      author: 'Test User',
      url: 'NoTitle',
      likes: 2
    }
    await api.post('/api/blogs')
      .set('authorization', 'bearer ' + token)
      .send(blogWithoutTitle)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length)
      .toBe(helper.sampleBlogs.length)
    const blogWithoutAuthor = {
      title: '4th Blog',
      url: 'NoAuthor',
      likes: 2
    }
    await api.post('/api/blogs')
      .set('authorization', 'bearer ' + token)
      .send(blogWithoutAuthor)
      .expect(400)
    expect(blogsAtEnd.length)
      .toBe(helper.sampleBlogs.length)
  })
})
afterAll(() => {
  mongoose.connection.close()
})
