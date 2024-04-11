import { autoFillFormHandler } from '@shared/features/note/FillFlashcardForm'

import { browser } from '@shared/shared/browser'

import { fillForm } from './helpers/fillForm'

browser.runtime.onConnect.addListener(function (port) {
  autoFillFormHandler(port, fillForm)
})
