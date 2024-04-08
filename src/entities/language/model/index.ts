import { DICTIONARIES } from '@entities/dictionary'

import { TLanguageCode } from './types'

export type { TLanguageCode, ILanguage } from './types'
export { LANGUAGES, LANGUAGE_CODES } from './languages'
export * as languageStore from './store'

export const getLanguageCodeByPageUrl = (url: string): TLanguageCode => {
  const languages = Object.entries(DICTIONARIES)

  let languageIndex = 0
  while (languageIndex < languages.length) {
    const languageDictionaries = languages[languageIndex][1].dictionaries

    let dictionaryIndex = 0
    while (dictionaryIndex < languageDictionaries.length) {
      const dictionary = languageDictionaries[dictionaryIndex]

      if (url.includes(dictionary.url)) {
        return languages[languageIndex][1].value
      }

      dictionaryIndex++
    }
    languageIndex++
  }

  return 'other'
}
