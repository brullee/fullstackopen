const Blog = require('../models/blog')

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


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}