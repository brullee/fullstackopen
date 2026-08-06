// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'


const CreateNew = ({ addAnecdote }) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.value && author.value && info.value) { 
    addAnecdote({ content: content.value, author: author.value, info: info.value, votes: 0 })
    navigate('/')
    }
  }
  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          {/* <input name='content' value={content} onChange={(e) => setContent(e.target.value)} /> */}
          <input { ...content }/>
        </div>
        <div>
          author
          {/* <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} /> */}
          <input { ...author }/>
        </div>
        <div>
          url for more info
          {/* <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} /> */}
          <input { ...info }/>
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={() => {
          info.onReset()
          author.onReset()
          content.onReset()
          }
        }>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
