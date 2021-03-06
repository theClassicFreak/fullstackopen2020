import React, { useState } from 'react'

const PostForm = ({ postFormRef, user, setBlogs, blogService, setErrorClass, setErrorMessage }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newURL, setNewURL] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const handlePostChange = (event) => {
    switch (event.target.name) {
    case 'title':
      setNewTitle(event.target.value)
      break
    case 'author':
      setNewAuthor(event.target.value)
      break
    case 'url':
      setNewURL(event.target.value)
      break
    default:
      break
    }
  }

  const addPost = async (event) => {
    event.preventDefault()
    try {
      let postObject = {}
      postObject['title'] = newTitle
      postObject['author'] = newAuthor
      postObject['url'] = newURL
      const result = await blogService.create(postObject)
      postFormRef.current.toggleVisibility()
      setNewTitle('')
      setNewAuthor('')
      setNewURL('')
      setBlogs(await blogService.getAll())
      setErrorMessage(`${result.title} has been posted by ${user.name}`)
      setErrorClass('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Could Not Create Blog Post')
      setErrorClass('failure')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <form onSubmit={addPost}>
        <div>
          <p>
                        Title
            <input id='title' name="title" value={newTitle} onChange={handlePostChange} />
          </p>
        </div>
        <div>
          <p>
                        Author
            <input id='author' name="author" value={newAuthor} onChange={handlePostChange} />
          </p>
        </div>
        <div>
          <p>
                        URL
            <input id='url' name="url" value={newURL} onChange={handlePostChange} />
          </p>
        </div>
        <button id='submit-button' type="submit">Create</button>
      </form>
    </div>
  )
}

export default PostForm
