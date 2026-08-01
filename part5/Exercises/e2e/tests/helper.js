const { expect } = require('@playwright/test')

const loginWith = async (page, username, password)  => {
  await page.getByRole('link', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} by ${author}`).waitFor()
}

const getLikes = async (page) => {
  const likesLocator = page.getByText(/likes \d+/)
  return Number((await likesLocator.textContent()).match(/likes (\d+)/)[1])
}

const addLike = async (page) => {
  const currentLikes = await getLikes(page)

  await page.getByRole('button', { name: 'like' }).click()
  await expect(page.getByText(/likes \d+/)).toHaveText(new RegExp(`likes ${currentLikes + 1}`))
}

export { loginWith, createBlog, addLike, getLikes }