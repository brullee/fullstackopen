import { TextField, Button } from '@mui/material'

const LoginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <TextField
      label="username"
      value={props.username}
      onChange={({ target }) => props.setUsername(target.value)}
    />
    <br />
    <TextField
      label="password"
      type="password"
      value={props.password}
      onChange={({ target }) => props.setPassword(target.value)}
    />
    <br />
    <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
      login
    </Button>
  </form>
)

export default LoginForm
