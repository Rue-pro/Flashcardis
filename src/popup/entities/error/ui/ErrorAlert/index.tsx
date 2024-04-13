import { useStore } from '@nanostores/preact'

import { browser } from '@popup/shared/browser'

import { $errors } from '@shared/entities/error'

export const ErrorAlert = () => {
  const errors = useStore($errors)

  if (!errors.length) return null

  return (
    <span>
      {browser.i18n.getMessage('FACING_PROBLEMS')} <br />
      <a href="https://github.com/Rue-pro/Flashcardis/issues" target="_blank">
        {browser.i18n.getMessage('FACING_PROBLEMS_HELP')}
      </a>
    </span>
  )
}
