const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, addLike, getLikes } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')    
    await request.post('/api/users', {
      data: {
        name: 'Database User',
        username: 'dbuser',
        password: 'dbpassword'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Database User2',
        username: 'dbuser2',
        password: 'dbpassword2'
      }
    })

    await page.goto('/') 
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('link', { name: 'login' }).click()
    await expect(page.getByLabel('username')).toBeVisible()
  })

    describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
    await loginWith(page, 'dbuser', 'dbpassword')

    await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')

    await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
    })
  })

  describe('When logged  in', () => {
  beforeEach(async ({ page }) => {
    await loginWith(page, 'dbuser', 'dbpassword')
  })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('link', { name: 'new blog' }).click()
      await createBlog(page, 'title', 'author', 'url')
      await expect(page.getByText('title by author')).toBeVisible  ()
    })

    
    describe('When a blog exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('link', { name: 'new blog' }).click()
        await createBlog(page, 'title', 'author', 'url')
      })

      test('a new blog can be liked', async ({ page }) => {
        await page.getByRole('link', { name: 'title by author' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('0')).not.toBeVisible()
      })

      test('a blog\'s creator  can delete it', async ({ page }) => {
        await page.getByRole('link', { name: 'title by author' }).click()
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'remove' }).click()
        
        await expect(page.getByText('title by author')).not.toBeVisible  ()
      })

      test('a blog can\'t be deleted by a different user', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'dbuser2', 'dbpassword2')

        await page.getByRole('link', { name: 'title by author' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test('a blog can\'t be liked or removed when logged out', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await page.getByRole('link', { name: 'title by author' }).click()
        await expect(page.getByRole('button', { name: 'like' })).not.toBeVisible()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

  // describe('When many blogs exist', () => {
  //   beforeEach(async ({ page }) => {
  //     await createBlog(page, 'title', 'author', 'url')
  //     await createBlog(page, 'title2', 'author2', 'url2')
  //     await createBlog(page, 'title3', 'author3', 'url3')

  //     await addLike(page, 'title', 'author')
  //     await addLike(page, 'title', 'author')
  //     await addLike(page, 'title', 'author')
  //     await addLike(page, 'title', 'author')
  //     await addLike(page, 'title', 'author')

  //     await addLike(page, 'title2', 'author2')
  //     await addLike(page, 'title2', 'author2')

  //     await addLike(page, 'title3', 'author3')
  //     await addLike(page, 'title3', 'author3')
  //     await addLike(page, 'title3', 'author3')

  //   })

  //   test('blogs ordered by like count', async ({page}) => {
  //     await page.getByText('title by author').getByRole('button', { name: 'view' }).click()
  //     await page.getByText('title2 by author2').getByRole('button', { name: 'view' }).click()
  //     await page.getByText('title3 by author3').getByRole('button', { name: 'view' }).click()

  //     const likeArray = [
  //       await getLikes(page, 'title', 'author'),
  //       await getLikes(page, 'title3', 'author3'),
  //       await getLikes(page, 'title2', 'author2'),
  //     ]

  //     expect(likeArray).toEqual([5,3,2])
  //   })
  // })
  })

})