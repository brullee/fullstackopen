import {
  Card,
  CardContent,
  Typography,
  Link,
  Button,
  Stack,
} from '@mui/material'

const Blog = ({ blog, addLike, handleRemove, user }) => {
  if (!blog) {
    return null
  }

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Stack spacing={1} alignItems="center">
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

          <Stack direction="row" spacing={2} alignItems="center">
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
      </CardContent>
    </Card>
  )
}

export default Blog
