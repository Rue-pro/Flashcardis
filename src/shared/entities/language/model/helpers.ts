import { getDictionaryByPageUrl } from '@shared/entities/dictionary'

import { languageStore } from '..'
import { TLanguageCode } from './types'

export const getLanguageCodeByPageUrl = (url: string): TLanguageCode => {
  const dictionary = getDictionaryByPageUrl(url)
  return dictionary ? dictionary.languageCode : 'other'
}

export const getLanguageCodeByPageMetaData = () => {
  const pageLanguageCode = document
    .getElementsByTagName('html')[0]
    .getAttribute('lang') as TLanguageCode

  return languageStore.$languageCodes.get().includes(pageLanguageCode)
    ? pageLanguageCode
    : 'other'
}
