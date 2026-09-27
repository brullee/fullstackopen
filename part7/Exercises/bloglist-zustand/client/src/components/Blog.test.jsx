import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Blog from './Blog'
import { useBlog, useBlogActions, useLoggedInUser } from '../store'

vi.mock('../store')

const blog = {
  id: '1',
  title: 'fso is good',
  author: 'boris',
  likes: 0,
  url: 'fullstackopen.com',
  comments: [],
  user: {
    name: 'abdalla',
    username: 'abdalla',
  },
}

const addLike = vi.fn()

const renderBlog = () =>
  render(
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </MemoryRouter>,
  )

describe('<Blog />', () => {
  beforeEach(() => {
    addLike.mockClear()
    useBlog.mockReturnValue([blog])
    useBlogActions.mockReturnValue({
      addLike,
      removeBlog: vi.fn(),
      addComment: vi.fn(),
    })
    useLoggedInUser.mockReturnValue({ username: 'abdalla' })
  })

  test('renders blog\'s title, author and url', () => {
    renderBlog()
    screen.getByText('fso is good')
    screen.getByText('boris', { exact: false })
    screen.getByText('fullstackopen.com')
  })

  test('clicking the like button twice calls addLike twice', async () => {
    const user = userEvent.setup()
    renderBlog()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)

    expect(addLike.mock.calls).toHaveLength(2)
  })

  test('remove button is only shown to the blog\'s creator', () => {
    useLoggedInUser.mockReturnValue({ username: 'someoneelse' })
    renderBlog()
    expect(screen.queryByText('Remove')).toBeNull()
  })
})
