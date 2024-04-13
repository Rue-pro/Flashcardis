import { browser } from '@popup/shared/browser'

export const FillFlashcardFormNotAvailable = () => (
  <span>{browser.i18n.getMessage('FILL_ANKI_FORM_NOT_AVAILABLE')}</span>
)
