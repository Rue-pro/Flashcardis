import { browser } from '@popup/shared/browser'

export const NoSelectedLanguages = () => (
  <span>{browser.i18n.getMessage('SELECTED_LANGUAGES_NO_ITEMS')}</span>
)
