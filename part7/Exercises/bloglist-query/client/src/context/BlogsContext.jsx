import { createContext } from 'react'
import useNotification from '../hooks/useNotify'
import blogService from '../services/blogs'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
const BlogsContext = createContext()

export default BlogsContext

export const BlogsContextProvider = (props) => {
  const { pushNotification } = useNotification()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (returnedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(returnedBlog))
      pushNotification({
        text: `a new blog "${returnedBlog.title}" added`,
        type: 'success',
      })
    },
    onError: () => {
      pushNotification({ text: 'title/url cannot be empty', type: 'error' })
    },
  })

  const addLikeMutation = useMutation({
    mutationFn: (blog) =>
      blogService.put(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        title: blog.title,
        author: blog.author,
        url: blog.url,
      }),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      )
    },
    onError: (err) => {
      console.log('caught error: ', err)
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: (data, blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== blog.id),
      )
    },
    onError: (error) => console.log('caught error: ', error),
  })

  if (result.isPending) {
    return <div>loading data...</div>
  }

  return (
    <BlogsContext.Provider
      value={{
        blogs: result.data.sort((a, b) => b.likes - a.likes),
        addBlog: addBlogMutation.mutate,
        addLike: addLikeMutation.mutate,
        removeBlog: removeBlogMutation.mutate,
      }}
    >
      {props.children}
    </BlogsContext.Provider>
  )
}
