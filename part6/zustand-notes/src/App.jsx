import { useEffect } from 'react'
import { useNoteActions } from './store'

import NoteForm from "./componenets/NoteForm"
import NoteList from "./componenets/NoteList"
import VisibilityFilter from "./componenets/VisibilityFilter"

const App = () => {
  const { initialize } = useNoteActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
  <div>
    <NoteForm />
    <VisibilityFilter />
    <NoteList />
  </div>
)}

export default App