import { Link } from 'react-router-dom'
import Blog from './Blog'

import { useBlog } from '../store'

function BlogList() {
  const blogs = useBlog()

  return (
    <div>
      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog) => (
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

export default BlogList
