import { useMatch, Link } from 'react-router-dom'
import { useUser } from '../store'

const User = () => {
  const users = useUser()

  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>added blogs:</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author && `by ${blog.author}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
