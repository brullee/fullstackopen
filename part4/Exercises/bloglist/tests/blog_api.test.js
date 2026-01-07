const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('fetching the blogs', () => {
  test('GET /api/blogs returns blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('GET /api/blogs returns all initial blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('each blog has id property and no _id property', async() => {
    const response = await api
      .get('/api/blogs')

    const blog = response.body[0]

    assert(!Object.hasOwn(blog,'_id'))
    assert(Object.hasOwn(blog,'id'))
  })
})

describe('adding new blogs', () => {
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

    const blogsInDb = await helper.blogsInDb()
    assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

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
})

describe('deleting a blog', () => {
  test('DELETE /api/blogs/:id succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(n => n.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })
})

describe('updating a blog', () => {
  test('PUT /api/blogs/:id succeeds with status code 200 if id is valid', async () => {
    const blogsInDb = await helper.blogsInDb()
    const blogToUpdate = blogsInDb[0]

    await api.put(`/api/blogs/${blogToUpdate.id}`).expect(200)

    const blogsAfterPut= await helper.blogsInDb()

    assert.strictEqual(blogsAfterPut[0].likes, blogToUpdate.likes + 1)
  })
})
after(async () => {
  await mongoose.connection.close()
})
