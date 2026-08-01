import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Notification from './Notification'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import loginService from '../services/login'
import noteService from '../services/notes'

const NoteList = ({ notes }) => {
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])


  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )


  return (
    <div>
      <h1 className='title'>Notes</h1>

      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          {user.name} logged in
          <button onClick={handleLogOut}>logout</button>
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <li key={note.id}>
            <Link
              to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NoteList