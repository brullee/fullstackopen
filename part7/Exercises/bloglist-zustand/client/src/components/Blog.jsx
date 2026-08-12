import { useNavigate, useMatch } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Link,
  Button,
  Stack,
  TextField,
  Divider,
  Paper,
} from '@mui/material'
import { useField } from '../hooks'

import { useBlog, useBlogActions, useLoggedInUser } from '../store'

const Blog = () => {
  const comment = useField('comment')
  const blogs = useBlog()
  const user = useLoggedInUser()

  const { removeBlog, addLike, addComment } = useBlogActions()

  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const handleRemove = async (blog) => {
    const removed = await removeBlog(blog)
    if (removed) {
      navigate('/')
    }
  }

  const handleComment = async (blog, commentValue) => {
    if (commentValue) {
      await addComment(blog, commentValue)
      comment.onReset()
    }
  }

  if (!blog) {
    return null
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5">{blog.title}</Typography>
          {blog.author && (
            <Typography variant="body1" sx={{ color: 'grey.700' }}>
              by {blog.author}
            </Typography>
          )}
          <Link href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </Link>
          <Typography variant="body2" sx={{ color: 'grey.700' }}>
            Added by {blog.user.name}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Typography sx={{ alignContent: 'center' }}>
              {blog.likes} likes
            </Typography>
            {user && (
              <Button variant="outlined" onClick={() => addLike(blog)}>
                Like
              </Button>
            )}
          </Stack>
          {blog.user.username === user.username && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemove(blog)}
            >
              Remove
            </Button>
          )}
        </Stack>
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>
          Comments
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
          <TextField {...comment} size="small" fullWidth />
          <Button
            type="button"
            variant="contained"
            onClick={() => handleComment(blog, comment.value)}
          >
            Post
          </Button>
        </Stack>
        {blog.comments.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'grey.700' }}>
            No comments yet
          </Typography>
        ) : (
          <Stack spacing={1}>
            {blog.comments.map((c) => (
              <Paper
                key={c}
                variant="outlined"
                sx={{ px: 2, py: 1, bgcolor: 'grey.50', borderRadius: 2 }}
              >
                <Typography variant="body2">{c}</Typography>
              </Paper>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}

export default Blog
