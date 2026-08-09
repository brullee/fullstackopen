const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 6
  },
  {
    title: 'Title of blog',
    author: 'Author of blog',
    url: 'String of url',
    likes: 0
  }
]

const userToken = async (api) => {
  const response = await api.post('/api/login').send({
    username: 'root',
    password: 'password' })
  return response.body.token
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb, userToken
}