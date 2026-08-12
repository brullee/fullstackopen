import { useMatch, Link as RouterLink } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Stack,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useUser } from '../store'

const User = () => {
  const users = useUser()

  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) {
    return null
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body2" sx={{ color: 'grey.700' }}>
            added blogs
          </Typography>
        </Stack>
        {user.blogs.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'grey.700', mt: 1 }}>
            No blogs added yet
          </Typography>
        ) : (
          <List dense disablePadding>
            {user.blogs.map((blog) => (
              <ListItemButton
                key={blog.id}
                component={RouterLink}
                to={`/blogs/${blog.id}`}
                disableGutters
              >
                <ListItemText
                  primary={blog.title}
                  secondary={blog.author && `by ${blog.author}`}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  )
}

export default User
