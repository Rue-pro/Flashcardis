import { ComponentChildren } from 'preact'
import { createPortal } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'

import { browser } from '@shared/browser'

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
      open ? dialogRef.current.showModal() : onClose()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <dialog ref={dialogRef} className={styles.modal}>
      <Button
        variant="secondary"
        className={styles['modal__close-btn']}
        onClick={onClose}
        startIcon={<ClearIcon />}
        capture={browser.i18n.getMessage('close')}
      ></Button>
      {children}
    </dialog>,
    document.getElementsByTagName('body')[0],
  )
}
