import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null)

  const pushNotification = (n) => {
    setNotification(n)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, pushNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
