import {
  getLanguageFromPageHandler,
  getNoteFromDictionaryPageHandler,
} from '@app/background/features/autoAddNewNote'

import { GOOGLE_TRANSLATE } from '@entities/dictionary'

import { browser } from '@shared/browser'

import { getNotesFields } from './helpers/getNotesFields'

browser.runtime.onConnect.addListener(async function (port) {
  if (port.name === 'Dictionary') {
    getNoteFromDictionaryPageHandler(port, (selectors) =>
      getNotesFields(selectors),
    )

    getLanguageFromPageHandler(port, () => GOOGLE_TRANSLATE.getLanguage())
  }
})
