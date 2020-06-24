const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blogposts => {
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

blogRouter.post('/', (request, response, next) => {
    const body = request.body

    const blogpost = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blogpost.save()
        .then(savedBlogPost => {
            response.json(savedBlogPost.toJSON())
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

blogRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blogpost = {
        title: body.title,
        author: body.author,
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
