import { useNavigate } from 'react-router-dom'
import { useField, useAnecdotes } from '../hooks'


const CreateNew = () => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const { addAnecdote } = useAnecdotes()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (content.value && author.value && info.value) { 
    await addAnecdote({ content: content.value, author: author.value, info: info.value, votes: 0 })
    navigate('/')
    }
  }
  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input { ...content }/>
        </div>
        <div>
          author
          <input { ...author }/>
        </div>
        <div>
          url for more info
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
