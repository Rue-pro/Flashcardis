import { useCallback, useRef, useState } from 'preact/hooks'

import { IToast } from './Toast'

export type TAddToastProps = Omit<IToast, 'id'>

export const useToastsStore = () => {
  const timersRef = useRef<Record<string, NodeJS.Timeout>>({})
  const [toasts, setToasts] = useState<IToast[]>([])

  const addToast = useCallback((toast: TAddToastProps) => {
    const toastId = new Date().toISOString()
    setToasts((prevToasts) => [
      {
        id: toastId,
        ...toast,
      },
      ...prevToasts,
    ])
    autoCloseToast(toastId)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    clearTimeout(timersRef.current[id])
    delete timersRef.current[id]
  }, [])

  const autoCloseToast = (id: string) => {
    timersRef.current[id] = setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  return { toasts, addToast, removeToast }
}
