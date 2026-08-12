import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
} from '@mui/material'

import {
  useNotificationActions,
  useBlogActions,
  useLoggedInUser,
  useLoggedInUserActions,
  useUserActions,
} from './store'

import CatchAll from './components/CatchAll'
import ErrorBoundary from './components/ErrorBoundary'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import persistentUser from './services/persistentUser'

const App = () => {
  const { initializeUsers } = useUserActions()
  const { initialize } = useBlogActions()
  const { setNotification } = useNotificationActions(null)
  const { setUser, checkUserToken } = useLoggedInUserActions()
  const user = useLoggedInUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    checkUserToken()
  }, [checkUserToken])

  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      persistentUser.saveUser(user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      setNotification({ text: 'wrong credentials', type: 'error' })
      setPassword('')
    }
  }

  const handleLogOut = () => {
    setUser('')
    persistentUser.removeUser()
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
          <Button color="inherit" component={Link} to="/users" sx={style}>
            users
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

      <Box sx={{ mt: 3 }}>
        <Notification />
        <ErrorBoundary>
          <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route
            path="/login"
            element={
              <div>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Login
                </Typography>
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
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/*" element={<CatchAll />} />
          </Routes>
        </ErrorBoundary>
      </Box>
    </Container>
  )
}

export default App
