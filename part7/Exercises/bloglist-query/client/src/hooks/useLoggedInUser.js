import { useContext } from 'react'
import LoggedInUserContext from '../context/LoggedInUserContext'

const useLoggedInUser = () => useContext(LoggedInUserContext)

export default useLoggedInUser
