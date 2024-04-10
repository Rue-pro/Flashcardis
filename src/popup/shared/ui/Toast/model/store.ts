import { nanoid } from 'nanoid'
import { atom } from 'nanostores'

import { IToast } from './types'

const timeouts: Record<string, NodeJS.Timeout> = {}

export const $toasts = atom<IToast[]>([])

export const addToast = (toast: Omit<IToast, 'id'>) => {
  const toastId = nanoid()

  $toasts.set([...$toasts.get(), { id: toastId, ...toast }])

  timeouts[toastId] = setTimeout(() => {
    removeToast(toastId)
  }, 2000)
}

export const removeToast = (id: string) => {
  clearTimeout(timeouts[id])
  delete timeouts[id]

  $toasts.set($toasts.get().filter((toast) => toast.id !== id))
}

export const cleanupToasts = () => {
  for (const id in timeouts) {
    clearTimeout(timeouts[id])
  }
  $toasts.set([])
}
