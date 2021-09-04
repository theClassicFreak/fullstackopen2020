import blogService from '../services/blogs'

export const handleLike = (blogToLike) => {
  return async dispatch => {
    const updatedBlog = await blogService.like(blogToLike)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const handleRemove = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE': {
    const id = action.data.id
    const blogToLike = state.find(n => n.id === id)
    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    return state.map(blog =>
      blog.id !== id ? blog : updatedBlog
    )
  }
  case 'REMOVE': {
    const id = action.data
    return state.filter(b => b.id !== id)
  }
  default: return state
  }
}

export default blogReducer