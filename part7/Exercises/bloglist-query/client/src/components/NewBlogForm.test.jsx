import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'fso is good',
  author: 'boris',
  likes: 0,
  url: 'fullstackopen.com',
  user: {
    name: 'abdalla',
  },
}

test('<NewBlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<NewBlogForm addBlog={addBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')

  const submitButton = screen.getByText('Create')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)
  await user.click(submitButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(addBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(addBlog.mock.calls[0][0].url).toBe(blog.url)

  console.log(addBlog.mock.calls)
})
