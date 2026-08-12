import { createContext } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useState, useEffect } from 'react'
import persistentUser from '../services/persistentUser'

const LoggedInUserContext = createContext()

export default LoggedInUserContext

export const LoggedInUserContextProvider = (props) => {
  const [user, setUser] = useState('')

  useEffect(() => {
    const loggedUserJSON = persistentUser.getUser()
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Login = async (username, password) => {
    const user = await loginService.login({
      username,
      password,
    })

    persistentUser.saveUser(user)
    blogService.setToken(user.token)
    setUser(user)
  }

  const LogOut = () => {
    setUser('')
    persistentUser.removeUser(user)
  }

  return (
    <LoggedInUserContext.Provider value={{ user, Login, LogOut }}>
      {props.children}
    </LoggedInUserContext.Provider>
  )
}
