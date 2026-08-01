import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'


import ErrorMessage from './components/ErrorMessage'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => (b.likes - a.likes)))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    }
    catch {
      setMessageColor('red')
      setMessage('wrong credentials')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
        setMessageColor(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    setUser('')
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        navigate('/')
        setMessageColor()
        setMessage(`a new blog "${returnedBlog.title}" ${blogObject.author && `by ${returnedBlog.author}`} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
        setMessageColor('red')
        setMessage('title/ url cannot be empty')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const addLike = (blog) => {
    const id = blog.id

    const likedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
    }

    blogService.put(id, likedBlog)
      .then((returnedBlog) => (
        setBlogs(blogs.map((b) =>
          b.id === id ? returnedBlog : b
        )))
      )
      .catch((error) => console.log('caught error: ', error))
  }

  const handleRemove = (blog) => {
    const confirm = window.confirm(`Remove ${blog.title}${blog.author ? ` by ${blog.author}` : ''}`)

    confirm &&  blogService.remove(blog.id)
      .then(() => {
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        navigate('/')
      })
      .catch((error) => console.log('caught error: ', error))
  }

  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find(note => note.id === match.params.id)
    : null

  return (
    <div>
      <div>
        <Link className='link' to="/">blogs</Link>
        {user &&
        <Link className='link' to="/create">new blog</Link>
        }
        {!user ?
          <Link className='link' to="/login">login</Link>
          : <button onClick={handleLogOut}>logout</button>}
      </div>
      <ErrorMessage message={message} color={messageColor} />

      <Routes>
        <Route path="/" element={
          <BlogList blogs={blogs} />}
        />
        <Route path="/blogs/:id" element={
          <Blog
            blog={blog}
            addLike={addLike}
            handleRemove={handleRemove}
            user={user}/>}
        />
        <Route path="/login" element={
          <div>
            <h2>Login</h2>
            <LoginForm
              username={username} setUsername={setUsername}
              password={password} setPassword={setPassword}
              handleLogin={handleLogin}
            />
          </div>}
        />
        <Route path="/create" element={
          <NewBlogForm addBlog={addBlog} />
        }/>

      </Routes>
    </div>
  )
}

export default App