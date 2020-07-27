const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', (request, response) => {
    Blog.find({})
    .populate('author', { username: 1, name: 1 })
    .then(blogposts => {
        response.json(blogposts.map(blogpost => blogpost.toJSON()))
    })
})

blogRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blogpost => {
            if (blogpost) {
                response.json(blogpost.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = await User.findById(body.author)

    const blogpost = new Blog({
        title: body.title,
        author: user._id,
        url: body.url,
        likes: body.likes
    })
    blogpost.save()
        .then(
          savedBlogPost => {
            response.json(savedBlogPost.toJSON())
            user.blogs = user.blogs.concat(savedBlogPost._id)
            user.save()
        })
        .catch(error => next(error))
})

blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const user = await User.findById(body.author)
    const blogpost = {
        title: body.title,
        author: user._id,
        url: body.url,
        likes: body.likes
    }
    Blog.findByIdAndUpdate(request.params.id, blogpost,  { new: true, runValidators: true, context: 'query' })
        .then(updatedBlogPost => {
            response.json(updatedBlogPost.toJSON())
        })
        .catch(error => next(error))
})

module.exports = blogRouter
