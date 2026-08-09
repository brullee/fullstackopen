import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (name) => {  
const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    name,
    value,
    onChange,
    onReset
  }
}
export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAnecdotes().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = async (anecdote) => {
    await anecdoteService.createAnecdote(anecdote).then((returnedAnecdote) => {
      setAnecdotes(anecdotes.concat(returnedAnecdote));
    });
  }

  const deleteAnecdote = (id) => {
    anecdoteService.removeAnecdote(id).then(() => {
      setAnecdotes(anecdotes.filter(a => a.id !== id))
    })
  }

  return { anecdotes, addAnecdote, deleteAnecdote }
}