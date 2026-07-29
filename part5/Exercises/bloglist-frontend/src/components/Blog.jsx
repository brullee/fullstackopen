import { useState } from 'react'

const Blog = ({ blog, addLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)

  let label = visible ? 'hide' : 'view'
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return(
    <div className="blog">
      {blog.title} {blog.author && `by ${blog.author} `}
      <button onClick={toggleVisibility}>{label}</button><br />
      <div style={showWhenVisible}>
        {blog.url}<br />
        likes {blog.likes}
        <button onClick={() => {
          addLike(blog)
          blog.likes + 1
        }}>
          like
        </button> <br />
        {blog.user.name}<br />
        {blog.user.username === user.username && (
          <button className="remove-btn" onClick={() => handleRemove(blog)}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog