import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'

import CatchAll from './components/CatchAll'
import ErrorBoundary from './components/ErrorBoundary'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'

import useNotification from './hooks/useNotify'

const App = () => {
  const [user, setUser] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { pushNotification } = useNotification()

  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      pushNotification({ text: 'wrong credentials', type: 'error' })
      setPassword('')
    }
  }

  const handleLogOut = () => {
    setUser('')
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar
        position="static"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" component="div" sx={{ padding: '10px' }}>
          Blog App
        </Typography>
        <Toolbar>
          <Button color="inherit" component={Link} to="/" sx={style}>
            blogs
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/create" sx={style}>
              new blog
            </Button>
          )}
          {!user ? (
            <Button color="inherit" component={Link} to="/login" sx={style}>
              login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogOut} sx={style}>
              logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog user={user} />} />
          <Route
            path="/login"
            element={
              <div>
                <h2>Login</h2>
                <LoginForm
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  handleLogin={handleLogin}
                />
              </div>
            }
          />
          <Route path="/create" element={<NewBlogForm />} />
          <Route path="/*" element={<CatchAll />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
