import cn from 'classnames'
import { ComponentChildren } from 'preact'

import { browser } from '@shared/browser'

import { Button, TButtonColor } from '../../Button'
import { ClearIcon } from '../../icons/ClearIcon'
import { IToast, TToastType } from '../model/types'
import styles from './styles.module.scss'

interface Props {
  toast: IToast
  removeToast: () => void
  openDetails: (details: ComponentChildren) => void
}

const mapToastTypeToButtonColor: Record<TToastType, TButtonColor> = {
  error: 'error',
  info: 'info',
  success: 'success',
}

export const Toast = ({ toast, removeToast, openDetails }: Props) => {
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
        aria-label={browser.i18n.getMessage('CLOSE')}
      />
    </li>
  )
}
