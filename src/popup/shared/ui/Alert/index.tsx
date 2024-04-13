import cn from 'classnames'
import { useState } from 'preact/hooks'

import { browser } from '@popup/shared/browser'

import { Button, TButtonColor } from '../Button'
import { ErrorDetails } from '../ErrorDetails'
import { Modal } from '../Modal'
import styles from './styles.module.scss'
import { IAlert, TAlertType } from './types'

interface Props {
  alert: IAlert
}

const mapToastTypeToButtonColor: Record<TAlertType, TButtonColor> = {
  error: 'error',
  info: 'info',
  success: 'success',
}

export const Alert = ({ alert }: Props) => {
  const [showDetails, setShowDetails] = useState<boolean>(false)

  const { title, message, details, type } = alert

  const alertClass = cn(styles.alert, styles[`alert--variant-${type}`])

  return (
    <div className={alertClass}>
      <p className={cn(styles.alert__title, 'h2')}>{title}</p>

      {typeof message === 'string' ? <p>{message}</p> : message}

      {!!details && (
        <>
          <Button
            variant="secondary"
            color={mapToastTypeToButtonColor[type]}
            onClick={() => setShowDetails(true)}
          >
            {browser.i18n.getMessage('TOAST_BUTTON_OPEN_DETAILS')}
          </Button>

          <Modal open={showDetails} onClose={() => setShowDetails(false)}>
            <ErrorDetails
              type={alert.type}
              content={`${details?.name} ${details?.message} ${details?.stack}`}
            />
          </Modal>
        </>
      )}
    </div>
  )
}
