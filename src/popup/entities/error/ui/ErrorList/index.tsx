import { useStore } from '@nanostores/preact'

import { browser } from '@popup/shared/browser'
import { Button } from '@popup/shared/ui/Button'

import { $errors, reset } from '@shared/entities/error'

import styles from './styles.module.scss'

export const ErrorList = () => {
  const errors = useStore($errors)

  if (!errors.length)
    return <span>{browser.i18n.getMessage('ERROR_LIST_NO_ITEMS')}</span>

  return (
    <>
      <Button
        className={styles['clear-button']}
        onClick={reset}
        variant="secondary"
      >
        {browser.i18n.getMessage('CLEAR')}
      </Button>
      <ul className={styles.errors}>
        {errors.map((error, index) => (
          <li key={index}>
            {error.type}
            {error.error?.name}
            {error.error?.message}
            {error.error?.stack}
          </li>
        ))}
      </ul>
    </>
  )
}
