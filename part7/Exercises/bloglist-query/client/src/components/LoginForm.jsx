import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import useLoggedInUser from '../hooks/useLoggedInUser'
import { useField } from '../hooks/useField'
import useNotification from '../hooks/useNotify'

const LoginForm = () => {
  const { Login } = useLoggedInUser()
  const username = useField('username')
  const password = useField('password')
  const { pushNotification } = useNotification()

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    await Login(username.value, password.value)
      .then(() => {
        username.onReset()
        password.onReset()
        navigate('/')
      })
      .catch(() => {
        pushNotification({ text: 'wrong credentials', type: 'error' })
        password.onReset()
      })
  }

  return (
    <form onSubmit={handleLogin}>
      <TextField {...username} />
      <br />
      <TextField type="password" {...password} />
      <br />
      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
        login
      </Button>
    </form>
  )
}

export default LoginForm
