
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    removeAnecdote: async (id) => {
      const anecdote = get().anecdotes.find(n => n.id === id)
      if (anecdote.votes === 0){
        await anecdoteService.remove(id)
      } else {
        useNotificationStore.getState().actions.setNotification('Can\'t delete anecdote with votes')
      }
      set(state => ({
        anecdotes: state.anecdotes.filter(n => n.id !== id)
      }))
  },
    addVote: async (id) => {
      const anecdote = get().anecdotes.find(n => n.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
        anecdotes: state.anecdotes.map(n => n.id === id ? updated : n)
      }))
    },
    addAnecdote: async (anecdote) => {
      const newAnecdote = await anecdoteService.createNew(anecdote)
      set(state => ({ anecdotes: [...state.anecdotes, newAnecdote]}))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

const useNotificationStore = create((set) => ({
  notification: '',
  actions: {
    setNotification: 
    value => {
      set(() => ({ notification: value }))
      setTimeout(() => {
      set(() => ({ notification: '' }))
      }, 5000)
    },
  }
}))


export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter !== '') return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  return anecdotes
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
