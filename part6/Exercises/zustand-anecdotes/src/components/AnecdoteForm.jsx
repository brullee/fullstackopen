import { useAnecdoteActions, useNotificationActions } from '../store'

function AnecdoteForm() {
  const { addAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const makeAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    addAnecdote(anecdote)
    setNotification(`Created '${anecdote}'`)
    e.target.reset()
  } 

  return (
    <div>
      <form onSubmit={makeAnecdote}>
          <div>
            <input name="anecdote" />
          </div>
          <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm