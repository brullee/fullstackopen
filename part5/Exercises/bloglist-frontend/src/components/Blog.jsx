const Blog = ({ blog, addLike, handleRemove, user }) => {

  if (!blog) {
    return null
  }

  return(
    <div>
      <h2>{blog.title} {blog.author && `by ${blog.author} `}</h2>
      {blog.url}<br />
        likes {blog.likes}
      {user &&
        <button onClick={() => {
          addLike(blog)
        }}>
          like
        </button>}
      <br />
      {blog.user.name}<br />
      {blog.user.username === user.username && (
        <button className="remove-btn" onClick={() => handleRemove(blog)}>remove</button>
      )}
    </div>
  )
}

export default Blog