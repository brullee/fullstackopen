import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import NewBlogForm from './NewBlogForm'
import { useBlogActions } from '../store'

vi.mock('../store')

const blog = {
  title: 'fso is good',
  author: 'boris',
  url: 'fullstackopen.com',
}

test('<NewBlogForm /> calls addBlog with the form values', async () => {
  const addBlog = vi.fn()
  useBlogActions.mockReturnValue({ addBlog })
  const user = userEvent.setup()

  const { container } = render(
    <MemoryRouter>
      <NewBlogForm />
    </MemoryRouter>,
  )

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)
  await user.click(screen.getByText('Create'))

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toEqual(blog)
})
