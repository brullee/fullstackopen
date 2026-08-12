import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useBlogs from '../hooks/useBlogs'

const NewBlogForm = () => {
  const { addBlog } = useBlogs()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url,
    })
    navigate('/')
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createBlog}>
      <div>
        <h2>Create New Blog:</h2>
        <TextField
          label="title"
          id="title-input"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <TextField
          label="author"
          id="author-input"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <TextField
          label="url"
          id="url-input"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          Create
        </Button>
      </div>
    </form>
  )
}

export default NewBlogForm
