import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import useNotification from './useNotify'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { pushNotification } = useNotification()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newNote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newNote))
      pushNotification(`added '${newNote.content}'`)
    },
    onError: (error) => {
      pushNotification(error.message)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(n => n.id === updatedAnecdote.id ? updatedAnecdote : n))
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isSuccess: result.isSuccess,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    addVote: (anecdote) => updateAnecdoteMutation.mutate({ 
      ...anecdote, votes: anecdote.votes + 1
    }),
  }
}