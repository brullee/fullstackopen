import { useState, useEffect } from 'react'


import { Routes, Route, Link, useMatch } from 'react-router-dom'
import noteService from './services/notes'

import Home from './components/Home'
import Note from './components/Note'
import Footer from './components/Footer'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
  }, [])


  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)))
      })
  }

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const match = useMatch('/notes/:id')

  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null

  console.log(note)

  return (
    <div>
      <div>
        <Link className='link' to="/">home</Link>
        <Link className='link' to="/notes">notes</Link>
        <Link className='link' to="/create">new note</Link>
      </div>

      <Routes>
        <Route path="/notes/:id" element={
          <Note note={note} toggleImportanceOf={toggleImportanceOf} deleteNote={deleteNote} />
        } />
        <Route path="/notes" element={
          <NoteList notes={notes} />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote}/>
        } />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
