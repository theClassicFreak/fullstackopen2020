const _ = require('lodash')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const dummy = (blogposts) => {
    blogposts.length
    return 1
}
const totalLikes = (blogposts) => {
    let total = 0
    blogposts.map(blogpost => {
        total = total + (blogpost.likes)
    })
    return total
}
const favoriteBlog = (blogposts) => {
    let mostLikedPost = null
    let highestLikes = -1
    blogposts.map(blogpost => {
        if(blogpost.likes > highestLikes) {
            mostLikedPost = blogpost
            highestLikes = blogpost.likes
        }
    })
    let tempPost = {}
    tempPost.title = mostLikedPost.title
    tempPost.author = mostLikedPost.author
    tempPost.likes = mostLikedPost.likes
    return (JSON.stringify(tempPost))
}
const mostBlogs = (blogposts) => {
    let groupedByAuthors = _.reduce(blogposts, (result, blogpost) => {
        (result[blogpost.author] || (result[blogpost.author] = []))
            .push(blogpost)
        return result
    }, {})
    let blogCount = _.forIn(groupedByAuthors, (value, key, result) => {
        result[key] = value.length
        return result
    })
    let blogCountSortedByValue = _(blogCount)
        .toPairs()
        .orderBy(1, 'desc')
        .fromPairs()
        .value()
    let tempPost = {}
    tempPost.author = _(blogCountSortedByValue)
        .toPairs()
        .value()[0][0]
    tempPost.blogs = _(blogCountSortedByValue)
        .toPairs()
        .value()[0][1]
    return (JSON.stringify(tempPost))
}
const mostLiked = (blogposts) => {
    let groupedByAuthor = _.reduce(blogposts, (result, blogpost) => {
        (result[blogpost.author] || (result[blogpost.author] = []))
            .push(blogpost)
        return result
    }, {})
    let likesPerAuthor = {}
    _.forIn(groupedByAuthor, (values, key) => {
        let likeCount = _.sumBy(values, function(o) {
            return o.likes
        })
        likesPerAuthor[key] = likeCount
    })
    let likesPerAuthorSortedByValue = _(likesPerAuthor)
        .toPairs()
        .orderBy(1, 'desc')
        .fromPairs()
        .value()
    let tempPost = {}
    tempPost.author = _(likesPerAuthorSortedByValue).toPairs().value()[0][0]
    tempPost.likes = _(likesPerAuthorSortedByValue).toPairs().value()[0][1]
    return(JSON.stringify(tempPost))
}
module.exports = {
    usersInDb,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLiked
}
