const _ = require('lodash')
const User = require('../models/user')
const Blog = require('../models/blog')

const sampleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422a8513333676234d17f7',
    title: 'Random Stuff',
    author: 'Lord Voldemort',
    url: 'https://isharrypotterdeadyet.com/',
    likes: 3,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const dummy = (blogposts) => {
  blogposts.length
  return 1
}

const totalLikes = (blogposts) => {
  let total = 0
  blogposts.map((blogpost) => {
    total = total + (blogpost.likes)
  })
  return total
}

const favoriteBlog = (blogposts) => {
  let mostLikedPost = null
  let highestLikes = -1
  blogposts.map((blogpost) => {
    if(blogpost.likes > highestLikes) {
      mostLikedPost = blogpost
      highestLikes = blogpost.likes
    }
  })
  const tempPost = {}
  tempPost.title = mostLikedPost.title
  tempPost.author = mostLikedPost.author
  tempPost.likes = mostLikedPost.likes
  return (JSON.stringify(tempPost))
}

const mostBlogs = (blogposts) => {
  const groupedByAuthors = _.reduce(blogposts, (result, blogpost) => {
    (result[blogpost.author] || (result[blogpost.author] = []))
      .push(blogpost)
    return result
  }, {})
  const blogCount = _.forIn(groupedByAuthors, (value, key, result) => {
    result[key] = value.length
    return result
  })

  const blogCountSortedByValue = _(blogCount)
    .toPairs()
    .orderBy(1, 'desc')
    .fromPairs()
    .value()
  const tempPost = {}
  tempPost.author = _(blogCountSortedByValue)
    .toPairs()
    .value()[0][0]
  tempPost.blogs = _(blogCountSortedByValue)
    .toPairs()
    .value()[0][1]
  return (JSON.stringify(tempPost))
}

const mostLiked = (blogposts) => {
  const groupedByAuthor = _.reduce(blogposts, (result, blogpost) => {
    (result[blogpost.author] || (result[blogpost.author] = []))
      .push(blogpost)
    return result
  }, {})
  const likesPerAuthor = {}
  _.forIn(groupedByAuthor, (values, key) => {
    const likeCount = _.sumBy(values, function(o) {
      return o.likes
    })
    likesPerAuthor[key] = likeCount
  })
  const likesPerAuthorSortedByValue = _(likesPerAuthor)
    .toPairs()
    .orderBy(1, 'desc')
    .fromPairs()
    .value()
  const tempPost = {}
  tempPost.author = _(likesPerAuthorSortedByValue)
    .toPairs()
    .value()[0][0]
  tempPost.likes = _(likesPerAuthorSortedByValue)
    .toPairs()
    .value()[0][1]
  return (JSON.stringify(tempPost))
}

module.exports = {
  usersInDb,
  blogsInDb,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLiked,
  sampleBlogs
}
