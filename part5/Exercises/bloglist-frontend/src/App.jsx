import { useState, useEffect, useRef } from 'react'

import ErrorMessage from './components/ErrorMessage'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()


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
    } catch {
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
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        blogFormRef.current.toggleVisibility()
        setBlogs(blogs.concat(returnedBlog))
        setMessageColor();
        (`a new blog "${returnedBlog.title}" ${author && `by ${returnedBlog.author}`} added`)
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
          setTitle(null)
          setAuthor(null)
          setUrl(null)
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
    const confirm = window.confirm(`Remove ${blog.title}`, blog.author && `by ${blog.author}`)

    confirm &&  blogService.remove(blog.id)
      .then(setBlogs(blogs.filter((b) =>
        b.id === blog.id ? null : b
      )))
      .catch((error) => console.log('caught error: ', error))
  }


  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <CreateBlogForm
        addBlog={addBlog}
        title={title} setTitle={setTitle}
        author={author} setAuthor={setAuthor}
        url={url} setUrl={setUrl}
      />
    </Togglable>
  )

  const showBlogs = () => (
    blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        addLike={addLike}
        handleRemove={handleRemove}/>
    )
  )


  return (
    <div>
      {!user ? <h2>Login</h2> : <h2>Blog List</h2>}
      <ErrorMessage message={message} color={messageColor} />
      {!user ?
        <LoginForm
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          handleLogin={handleLogin}
        /> :

        <>
          {user.name} logged in
          <button onClick={handleLogOut}>logout</button>
          {blogForm()}
          {showBlogs()}
        </>
      }

    </div>
  )
}

export default App