import { browser } from '@popup/shared/browser'

export const NoNotes = () => (
  <span>{browser.i18n.getMessage('NOTE_LIST_NO_ITEMS')}</span>
)
