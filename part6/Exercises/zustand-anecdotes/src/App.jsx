import { useEffect } from 'react'

import { useAnecdoteActions } from './store'

import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
    const { initialize } = useAnecdoteActions()

  useEffect(() => {
    initialize()
  }, [initialize])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>Create New</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App