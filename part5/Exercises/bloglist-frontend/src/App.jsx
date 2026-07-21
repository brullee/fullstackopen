import { useState, useEffect } from 'react'

import ErrorMessage from './components/ErrorMessage'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState();
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      setMessageColor("red");
      setMessage('wrong credentials')
      setPassword('') 
      setTimeout(() => {
        setMessage(null)
        setMessageColor(null);
      }, 5000)
      }
    }

  const handleLogOut = () =>{
    setUser(null)
    window.localStorage.removeItem("loggedBlogAppUser")
  }

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

      blogService
            .create(newBlog)
            .then((returnedBlog) => {
              setBlogs(blogs.concat(returnedBlog));
              setMessageColor();
              setMessage(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
            .catch((error) => {
              console.log(error.response.data.error);
              setMessageColor("red");
              setMessage(error.response.data.error);
              setTimeout(() => {
                setMessage(null);
                setMessageColor();
                setTitle(null);
                setAuthor(null);
                setUrl(null);
              }, 5000);
            });
        }


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
        <CreateBlogForm 
        addBlog={addBlog} 
        title={title} setTitle={setTitle} 
        author={author} setAuthor={setAuthor}
        url={url} setUrl={setUrl}
        />
        <h2>Blog</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
      }
      
    </div>
  )
}

export default App