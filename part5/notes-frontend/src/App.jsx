import { useState, useEffect } from 'react'


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import noteService from './services/notes'

import Home from './components/Home'
import Note from './components/Note'
import Footer from './components/Footer'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])


  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
  }, [])


  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }


  return (
    <Router>
      <div>
        <Link className='link' to="/">home</Link>
        <Link className='link' to="/notes">notes</Link>
        <Link className='link' to="/create">new note</Link>
      </div>

      <Routes>
        <Route path="/notes" element={
          <NoteList notes={notes} />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote}/>
        } />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
