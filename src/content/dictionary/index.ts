import { browser } from '@content/shared/browser'

import {
  getLanguageFromPageHandler,
  getNoteFromDictionaryPageHandler,
} from '@shared/features/note/AutoAddNewNote'

import { GOOGLE_TRANSLATE } from '@shared/entities/dictionary'

import { getNotesFields } from './helpers/getNotesFields'

browser.runtime.onConnect.addListener(async function (port) {
  if (port.name === 'Dictionary') {
    getNoteFromDictionaryPageHandler(port, (selectors) =>
      getNotesFields(selectors),
    )

    getLanguageFromPageHandler(port, () => GOOGLE_TRANSLATE.getLanguage())
  }
})
