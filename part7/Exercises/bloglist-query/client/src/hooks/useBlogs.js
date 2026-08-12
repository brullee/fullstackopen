import { useContext } from 'react'
import BlogsContext from '../context/BlogsContext'

const useBlogs = () => useContext(BlogsContext)

export default useBlogs
