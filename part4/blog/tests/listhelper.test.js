const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result)
    .toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog post, retun the likes of that blog', () => {
    const result = listHelper.totalLikes([listHelper.sampleBlogs[0]])
    expect(result).toBe(7)
  })
  test('test to return total likes', () => {
    const result = listHelper.totalLikes(listHelper.sampleBlogs)
    expect(result).toBe(39)
  })
})

describe('most number of blog posts', () => {
  test('test to return most liked blog post', () => {
    const result = listHelper.favoriteBlog(listHelper.sampleBlogs)
    expect(result).toEqual('{"title":"Canonical string reduction","author":"Edsger W. Dijkstra","likes":12}')
  })
})

describe('most number of blog posts', () => {
  test('test to return author with most blog posts', () => {
    const result = listHelper.mostBlogs(listHelper.sampleBlogs)
    expect(result).toEqual('{"author":"Robert C. Martin","blogs":3}')
  })
})

describe('most number of likes', () => {
  test('test to return author with most likes', () => {
    const result = listHelper.mostLiked(listHelper.sampleBlogs)
    expect(result).toEqual('{"author":"Edsger W. Dijkstra","likes":17}')
  })
})
