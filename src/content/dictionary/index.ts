import { getLanguageFromPageHandler } from '@background/features/autoAddNewNote'
import { getNoteFromDictionaryPageHandler } from '@background/features/autoAddNewNote'

import { GOOGLE_TRANSLATE } from '@shared/entities/dictionary'

import { browser } from '@shared/shared/browser'

import { getNotesFields } from './helpers/getNotesFields'

browser.runtime.onConnect.addListener(async function (port) {
  if (port.name === 'Dictionary') {
    getNoteFromDictionaryPageHandler(port, (selectors) =>
      getNotesFields(selectors),
    )

    getLanguageFromPageHandler(port, () => GOOGLE_TRANSLATE.getLanguage())
  }
})
