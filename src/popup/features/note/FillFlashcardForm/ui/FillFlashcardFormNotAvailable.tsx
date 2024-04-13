import { browser } from '@popup/shared/browser'

import styles from './styles.module.scss'

export const FillFlashcardFormNotAvailable = () => (
  <span className={styles.alert}>
    {browser.i18n.getMessage('FILL_ANKI_FORM_NOT_AVAILABLE')}
  </span>
)
