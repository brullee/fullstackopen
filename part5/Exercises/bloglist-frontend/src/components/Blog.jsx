import { useState } from 'react'

const Blog = ({ blog, addLike, handleRemove }) => {
  const [hide, setHide] = useState(true)

  let label = hide ? 'view' : 'hide'
  return(
    <div className="blog">
      {blog.title} {blog.author && `by ${blog.author} `}
      <button onClick={() => setHide(!hide)}>{label}</button><br />
      {!hide &&
        <>
          {blog.url}<br />
          likes {blog.likes}
          <button onClick={() => {
            addLike(blog)
            blog.likes + 1
          }}>
            like
          </button> <br />
          {blog.user.name}<br />
          <button className="remove-btn" onClick={() => handleRemove(blog)}>remove</button>
        </>
      }

    </div>
  )
}

export default Blog