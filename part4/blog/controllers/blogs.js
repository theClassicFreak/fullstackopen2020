const blogRouter = require('express')
  .Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
blogRouter.get('/', (request, response, next) => {
  Blog.find({})
    .populate('user', {
      username: 1,
      name: 1
    })
    .then(blogposts => {
      response.json(blogposts.map(blogpost => blogpost.toJSON()))
    })
    .catch(error => next(error))
})
blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .populate('user', {
      username: 1,
      name: 1
    })
    .then(blogpost => {
      if(blogpost) {
        response.json(blogpost.toJSON())
      }
      else {
        response.status(404)
          .end()
      }
    })
    .catch(error => next(error))
})
blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  try {
    if(!request.token || !decodedToken.id) {
      return response.status(401)
        .json({
          error: 'token invalid or missing'
        })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201)
      .json(savedBlog.toJSON())
  }
  catch (error) {
    next(error)
  }
})
blogRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(401)
      .json({
        error: 'token missing or invalid'
      })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if(user._id.toString() === blog.user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
      .catch(error => next(error))
    return response.status(204)
      .end()
  }
  else {
    return response.status(401)
      .json({
        error: 'You are not allowed to delete this post'
      })
  }
})
blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(401)
      .json({
        error: 'token missing or invalid'
      })
  }
  const user = await User.findById(decodedToken.id)
  const blogpost = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  }
  Blog.findByIdAndUpdate(request.params.id, blogpost, {
      new: true,
      runValidators: true,
      context: 'query'
    })
    .then(updatedBlogPost => {
      response.json(updatedBlogPost.toJSON())
    })
    .catch(error => next(error))
})
module.exports = blogRouter
