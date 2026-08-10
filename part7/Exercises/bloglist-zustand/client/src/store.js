import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    setNotification: (value) => {
      set(() => ({ notification: value }))
      setTimeout(() => {
        set(() => ({ notification: null }))
      }, 5000)
    },
  },
}))

export const useNotification = () =>
  useNotificationStore((state) => state.notification)
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)
