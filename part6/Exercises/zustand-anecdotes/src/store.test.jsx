import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { render, screen } from '@testing-library/react'

import AnecdoteList from './components/AnecdoteList'

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  }
}))

beforeEach( async () => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
  const mockAnecdotes = [
    { id: 1, content: 'anecdote1', votes: 3 },
    { id: 2, content: 'anecdote2', votes: 0 },
    { id: 3, content: 'anecdote3', votes: 7 }
  ]
  anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

  const { result } = renderHook(() => useAnecdoteActions())

  await act(async () => {
    await result.current.initialize()
  })
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {

    const mockAnecdotes = [{ id: 4, content: 'Test', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })
})

describe('AnecdoteList', () => {
  render(<AnecdoteList />)

  it('displays anecdote from store', async () => {
    await expect(screen.getByText('anecdote1'))
  })

  it('displays correctly filtered anecdotes', async () => {
    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    const filteredArray = anecdotesResult.current.toSorted((a,b) => b.votes - a.votes).map((anecdote) => anecdote.content)

    expect(filteredArray).toEqual(['anecdote3','anecdote1','anecdote2'])
  })

  it('voting increases the number of votes', async () => {
    anecdoteService.update.mockImplementation((id, anecdote) => Promise.resolve(anecdote))

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await actionsResult.current.addVote(2)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    const voted = anecdotesResult.current.find((a) => a.id === 2)

    expect(voted.votes).toBe(1)
  })
})