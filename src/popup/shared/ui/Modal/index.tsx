import { ComponentChildren } from 'preact'
import { createPortal } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'

import { browser } from '@popup/shared/browser'

import { Button } from '../Button'
import { ClearIcon } from '../icons/ClearIcon'
import styles from './styles.module.scss'

interface Props {
  open: boolean
  onClose: () => void
  children: ComponentChildren
}

export const Modal = ({ open, children, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.showModal()
      } else {
        dialogRef.current.close()
        onClose()
      }
    }
  }, [open])

  return createPortal(
    <dialog ref={dialogRef} className={styles.modal}>
      <Button
        variant="secondary"
        className={styles['modal__close-btn']}
        onClick={onClose}
        startIcon={<ClearIcon />}
        aria-label={browser.i18n.getMessage('CLOSE')}
      ></Button>
      {children}
    </dialog>,
    document.getElementsByTagName('body')[0],
  )
}
