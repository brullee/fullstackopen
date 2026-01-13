const bcrypt = require('bcrypt')
const User = require('../models/user')
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('creation fails with proper statuscode and message if username already taken', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('expected `username` to be unique'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('creation fails with proper statuscode and message if username is too short', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'ro',
    name: 'Superuser',
    password: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()

  assert(result.body.error.includes('the minimum allowed length (3)'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

after(async () => {
  await mongoose.connection.close()
})