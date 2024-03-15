import cn from 'classnames'
import { ComponentChildren, createContext } from 'preact'
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'preact/hooks'

import { browser } from '@shared/browser'

import { Button, IButtonColors } from '../Button'
import { Modal } from '../Modal'
import { ClearIcon } from '../icons/ClearIcon'
import styles from './styles.module.scss'

interface IToast {
  title: string
  message?: ComponentChildren
  details?: ComponentChildren
  id: string
  type: 'error' | 'info' | 'success'
}

type IAddToastProps = Omit<IToast, 'id'>

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
  const [details, setDetails] = useState<ComponentChildren | null>(null)
  const [toasts, setToasts] = useState<IToast[]>([])

  const addToast = (toast: IAddToastProps) => {
    setToasts((prevToasts) => [
      {
        id: new Date().toISOString(),
        ...toast,
      },
      ...prevToasts,
    ])
  }

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

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

interface ToastProps {
  toast: IToast
  removeToast: () => void
  openDetails: (details: ComponentChildren) => void
}

const mapToastTypeToButtonColor: Record<IToast['type'], IButtonColors> = {
  error: 'error',
  info: 'info',
  success: 'success',
}

export const Toast = ({ toast, removeToast, openDetails }: ToastProps) => {
  const timerRef = useRef<NodeJS.Timeout>()
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      removeToast()
    }, 3000)

    return () => clearTimeout(timerRef.current)
  }, [])

  const { title, message, details, type } = toast

  const toastClass = cn(styles.toast, styles[`toast--variant-${type}`])

  return (
    <li className={toastClass} role="status">
      <div className={styles.toast__content}>
        <p className={cn(styles.toast__title, 'h2')}>{title}</p>

        {typeof message === 'string' ? <p>{message}</p> : message}

        {!!details && (
          <Button
            variant="secondary"
            color={mapToastTypeToButtonColor[type]}
            onClick={() => openDetails(details)}
          >
            Open details
          </Button>
        )}
      </div>

      <Button
        variant="secondary"
        color={mapToastTypeToButtonColor[type]}
        endIcon={<ClearIcon />}
        onClick={removeToast}
        aria-label={browser.i18n.getMessage('closeToast')}
      />
    </li>
  )
}
