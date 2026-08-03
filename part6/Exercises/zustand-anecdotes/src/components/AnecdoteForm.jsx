import { useAnecdoteActions } from '../store'


function AnecdoteForm() {
  const { addAnecdote } = useAnecdoteActions()

  const makeAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    addAnecdote(anecdote)
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