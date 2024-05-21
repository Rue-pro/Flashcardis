import { $languageCodes } from './store'
import { TLanguageCode } from './types'

export const getLanguageCodeByPageMetaData = () => {
  const pageLanguageCode = document
    .getElementsByTagName('html')[0]
    .getAttribute('lang') as TLanguageCode

  return $languageCodes.get().includes(pageLanguageCode)
    ? pageLanguageCode
    : 'other'
}
