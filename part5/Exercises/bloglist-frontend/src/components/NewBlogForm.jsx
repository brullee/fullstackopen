import { useState } from 'react'

const NewBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={createBlog}>
      <div>
        <h2>Create New Blog:</h2>
        <label>
          title:
          <input
            id="title-input"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <br/>
        <label>
          author:
          <input
            id="author-input"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <br/>
        <label>
          url:
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br/>
        <button type="submit">Create</button>
      </div>
    </form>
  )}

export default NewBlogForm