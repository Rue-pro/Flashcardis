import { browser } from '@content/shared/browser'

import {
  getLanguageFromPageHandler,
  getNoteFromDictionaryPageHandler,
} from '@shared/features/note/AutoAddNewNote'

import {
  GOOGLE_TRANSLATE,
  getDictionaryLanguageCodeByPageUrl,
} from '@shared/entities/dictionary'
import {
  TLanguageCode,
  getLanguageCodeByPageMetaData,
} from '@shared/entities/language'
import { $languages } from '@shared/entities/language/model/store'

import { getNotesFields } from './helpers/getNotesFields'

browser.runtime.onConnect.addListener(async function (port) {
  $languages.listen(() => {})

  if (port.name === 'CurrentPage') {
    getLanguageFromPageHandler(port, () => {
      let pageLanguage: TLanguageCode = 'other'
      const isTranslatorPage = window.location.href.includes(
        GOOGLE_TRANSLATE.url,
      )
      if (isTranslatorPage) {
        pageLanguage = GOOGLE_TRANSLATE.getLanguage()
      } else {
        pageLanguage = getDictionaryLanguageCodeByPageUrl(window.location.href)
        if (pageLanguage === 'other') {
          pageLanguage = getLanguageCodeByPageMetaData()
        }
      }
      return pageLanguage
    })
  }

  if (port.name === 'Dictionary') {
    getNoteFromDictionaryPageHandler(port, (selectors) =>
      getNotesFields(selectors),
    )

    getLanguageFromPageHandler(port, () => GOOGLE_TRANSLATE.getLanguage())
  }
})
