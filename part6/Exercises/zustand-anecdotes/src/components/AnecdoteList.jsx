import { useAnecdotes } from '../store'
import Anecdote from './Anecdote'

function AnecdoteList() {
  const anecdotes = useAnecdotes()

  return (
    <ul>
      {anecdotes.toSorted((a,b) => b.votes - a.votes ).map(anecdote => (
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote}/>
        </div>
      ))}</ul>
  )
}

export default AnecdoteList