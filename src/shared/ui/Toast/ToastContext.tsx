import { ComponentChildren, createContext } from 'preact'
import { useContext, useState } from 'preact/hooks'

import { Modal } from '../Modal'
import { Toast } from './Toast'
import styles from './styles.module.scss'
import { IAddToastProps, useToastsStore } from './toastStore'

const ToastDispatchContext = createContext<{
  addToast: (toast: IAddToastProps) => void
}>({
  addToast: () => {
    throw Error('Not implemented')
  },
})

export const ToastProvider = ({
  children,
}: {
  children: ComponentChildren
}) => {
  const { toasts, addToast, removeToast } = useToastsStore()
  const [details, setDetails] = useState<ComponentChildren | null>(null)

  return (
    <ToastDispatchContext.Provider value={{ addToast }}>
      <ul className={styles.toasts}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            removeToast={() => removeToast(toast.id)}
            openDetails={setDetails}
          />
        ))}
      </ul>

      {children}

      <Modal open={!!details} onClose={() => setDetails(null)}>
        {details}
      </Modal>
    </ToastDispatchContext.Provider>
  )
}

export const useToast = () => useContext(ToastDispatchContext)
