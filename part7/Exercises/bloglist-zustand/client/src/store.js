import { create } from 'zustand'
import blogService from './services/blogs'

const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    setNotification: (value) => {
      set(() => ({ notification: value }))
      setTimeout(() => {
        set(() => ({ notification: null }))
      }, 5000)
    },
  },
}))

export const useNotification = () =>
  useNotificationStore((state) => state.notification)
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)

const useBlogStore = create((set, get) => ({
  blogs: [],
  actions: {
    setBlogs: (value) => {
      set(() => ({ blogs: value }))
    },
    addBlog: (blogObject) => {
      blogService
        .create(blogObject)
        .then((returnedBlog) => {
          set(() => ({ blogs: get().blogs.concat(returnedBlog) }))
          useNotificationStore.getState().actions.setNotification({
            text: `a new blog "${returnedBlog.title}" ${blogObject.author && `by ${returnedBlog.author}`} added`,
            type: 'success',
          })
        })
        .catch((error) => {
          console.log(error)
          useNotificationStore.getState().actions.setNotification({
            text: 'title/ url cannot be empty',
            type: 'error',
          })
        })
    },
    removeBlog: (blog) => {
      const confirm = window.confirm(
        `Remove ${blog.title}${blog.author ? ` by ${blog.author}` : ''}`,
      )

      confirm &&
        blogService
          .remove(blog.id)
          .then(() => {
            set(() => ({
              blogs: get().blogs.filter((b) => b.id !== blog.id),
            }))
          })
          .catch((error) => console.log('caught error: ', error))
    },
    addLike: (blog) => {
      const id = blog.id

      const likedBlog = {
        user: blog.user.id,
        likes: blog.likes + 1,
        title: blog.title,
        author: blog.author,
        url: blog.url,
      }

      blogService
        .put(id, likedBlog)
        .then((returnedBlog) =>
          set(() => ({
            blogs: get().blogs.map((b) => (b.id === id ? returnedBlog : b)),
          })),
        )
        .catch((error) => console.log('caught error: ', error))
    },
    initialize: async () => {
      await blogService
        .getAll()
        .then((blogs) =>
          set(() => ({ blogs: blogs.sort((a, b) => b.likes - a.likes) })),
        )
    },
  },
}))

export const useBlog = () => useBlogStore((state) => state.blogs)
export const useBlogActions = () => useBlogStore((state) => state.actions)

const useUserStore = create((set) => ({
  user: '',
  actions: {
    setUser: (value) => {
      set(() => ({ user: value }))
    },
    checkUserToken: () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        set(() => ({ user: user }))
        blogService.setToken(user.token)
      }
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)
