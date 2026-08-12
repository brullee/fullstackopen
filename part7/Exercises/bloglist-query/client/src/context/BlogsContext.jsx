import { createContext, useState, useEffect } from 'react'
import useNotification from '../hooks/useNotify'
import blogService from '../services/blogs'

const BlogsContext = createContext()

export default BlogsContext

export const BlogsContextProvider = (props) => {
  const [blogs, setBlogs] = useState([])
  const { pushNotification } = useNotification()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        pushNotification({
          text: `a new blog "${returnedBlog.title}" ${blogObject.author && `by ${returnedBlog.author}`} added`,
          type: 'success',
        })
      })
      .catch((error) => {
        console.log(error)
        pushNotification({
          text: 'title/ url cannot be empty',
          type: 'error',
        })
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

    blogService
      .put(id, likedBlog)
      .then((returnedBlog) =>
        setBlogs(blogs.map((b) => (b.id === id ? returnedBlog : b))),
      )
      .catch((error) => console.log('caught error: ', error))
  }

  const removeBlog = (blog) => {
    const confirm = window.confirm(
      `Remove ${blog.title}${blog.author ? ` by ${blog.author}` : ''}`,
    )

    confirm &&
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== blog.id))
          // navigate('/')
        })
        .catch((error) => console.log('caught error: ', error))
  }

  return (
    <BlogsContext.Provider value={{ blogs, addBlog, addLike, removeBlog }}>
      {props.children}
    </BlogsContext.Provider>
  )
}
