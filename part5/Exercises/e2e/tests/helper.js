const { expect } = require('@playwright/test')

const loginWith = async (page, username, password)  => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} by ${author}`).waitFor()
}

const getLikes = async (page, title, author) => {
  const blog = page.getByText(`${title} by ${author}`)
  const likesLocator = blog.getByText(/likes \d+/)
  return Number((await likesLocator.textContent()).match(/likes (\d+)/)[1])
}

const addLike = async (page, title, author) => {
  const blog = page.getByText(`${title} by ${author}`)
  await blog.getByRole('button', { name: 'view' }).click()

  const currentLikes = await getLikes(page, title, author)

  await blog.getByRole('button', { name: 'like' }).click()
  await expect(blog.getByText(/likes \d+/)).toHaveText(new RegExp(`likes ${currentLikes + 1}`))

  await blog.getByRole('button', { name: 'hide' }).click()
}

export { loginWith, createBlog, addLike, getLikes }