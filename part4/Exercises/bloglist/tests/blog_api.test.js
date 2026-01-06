const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
// const helper = require('./test_helper')

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('GET /api/blogs returns blogs as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('GET /api/blogs returns all initial blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('each blog has id property and no _id property', async() => {
  const response = await api
    .get('/api/blogs')

  const blog = response.body[0]

  assert(!Object.hasOwn(blog,'_id'))
  assert(Object.hasOwn(blog,'id'))
})

test('POST /api/blogs successfully creates a new blog', async () => {
  const newBlog = {
    title: 'Blog Title',
    author: 'Author',
    url: 'String',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await Blog.find({}).then((blogs) => blogs.map(blog => blog.toJSON()))
  assert.strictEqual(blogsInDb.length, initialBlogs.length + 1)

  const blogTitles = blogsInDb.map(b => b.title)
  assert(blogTitles.includes(newBlog.title))
})

test('POST /api/blogs likes default to 0 if missing', async () => {
  const newBlog = {
    title: '0 likes blog',
    author: 'Author',
    url: 'String',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.equal(response.body.likes, 0)
})

test('POST /api/blogs fails with 400 if url is missing', async () => {
  const newBlog = {
    title: 'Blog Title',
    author: 'Author',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

test('POST /api/blogs fails with 400 if title is missing', async () => {
  const newBlog = {
    author: 'Author',
    url: 'url',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

after(async () => {
  await mongoose.connection.close()
})
