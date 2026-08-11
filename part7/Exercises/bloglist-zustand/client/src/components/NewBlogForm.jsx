import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { useField } from '../hooks'
import { useBlogActions } from '../store'

const NewBlogForm = () => {
  const { addBlog } = useBlogActions()
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (title.value && author.value && url.value) {
      addBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
      navigate('/')
    }

    title.onReset()
    author.onReset()
    url.onReset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Create New Blog:</h2>
        <TextField id="title-input" {...title} />
        <br />
        <TextField id="author-input" {...author} />
        <br />
        <TextField id="url-input" {...url} />
        <br />
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          Create
        </Button>
      </div>
    </form>
  )
}

export default NewBlogForm
