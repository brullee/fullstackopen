import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'

import CatchAll from './components/CatchAll'
import ErrorBoundary from './components/ErrorBoundary'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

import useLoggedInUser from './hooks/useLoggedInUser'

const App = () => {
  const { user, LogOut } = useLoggedInUser()

  const navigate = useNavigate()

  const handleLogOut = () => {
    LogOut()
    navigate('/')
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
                <LoginForm />
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
