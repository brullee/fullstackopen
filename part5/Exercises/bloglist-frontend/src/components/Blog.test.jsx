import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'fso is good',
  author: 'boris',
  likes: 0,
  url: 'fullstackopen.com',
  user: {
    name: 'abdalla'
  }
}

const mockHandler = vi.fn()


describe('<Blog />', () => {
  beforeEach(() => {
    render(
      <Blog blog={blog} addLike={mockHandler}/>
    )
  })

  test('renders blog\'s title & author', () => {
    screen.getByText('fso is good', { exact: false })
    screen.getByText('boris', { exact: false })
  })

  test('at start the children are not displayed', () => {
    const url = screen.getByText('fullstackopen.com',  { exact: false })
    const likes = screen.getByText('0',  { exact: false })
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('fullstackopen.com',  { exact: false })
    const likes = screen.getByText('0',  { exact: false })
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

    // console.log(mockHandler.mock.calls)
  })

})