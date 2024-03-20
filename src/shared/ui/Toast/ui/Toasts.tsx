import { useStore } from '@nanostores/preact'
import { cleanup } from '@testing-library/preact'
import { ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { Modal } from '../../Modal'
import { $toasts, removeToast } from '../model/store'
import { Toast } from './Toast'
import styles from './styles.module.scss'

export const Toasts = () => {
  const toasts = useStore($toasts)
  const [details, setDetails] = useState<ComponentChildren | null>(null)

  useEffect(() => {
    return () => cleanup()
  }, [])

  return (
    <>
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

      <Modal open={!!details} onClose={() => setDetails(null)}>
        {details}
      </Modal>
    </>
  )
}
