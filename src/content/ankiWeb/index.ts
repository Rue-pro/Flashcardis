import { browser } from '@content/shared/browser'

import { autoFillFormHandler } from '@shared/features/note/FillFlashcardForm'

import { fillForm } from './helpers/fillForm'

browser.runtime.onConnect.addListener(function (port) {
  autoFillFormHandler(port, fillForm)
})
