import { useAnecdoteActions, useNotificationActions } from '../store'

function Anecdote({anecdote}) {
  const { addVote, removeAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const vote = anecdote => {
    addVote(anecdote.id)
    setNotification(`You voted '${anecdote.content}'`)
  }

  const remove = id => {
    removeAnecdote(id)
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote)}>vote</button>
      {anecdote.votes === 0 &&
      <button onClick={() => remove(anecdote.id)}>remove</button>}
      </div>
    </div>
  )
}

export default Anecdote