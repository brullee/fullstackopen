import { useContext } from 'react'
import NotificaitonContext from '../context/NotificationContext'

const useNotification = () => useContext(NotificaitonContext)

export default useNotification
