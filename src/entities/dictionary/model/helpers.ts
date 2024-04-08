import { TLanguageCode } from '@entities/language'

import { DICTIONARIES } from '.'
import { IDictionary } from './types'

export const getDictionaryByPageUrl = (
  pageUrl: string,
): { languageCode: TLanguageCode; dictionary: IDictionary } | null => {
  const languages = Object.values(DICTIONARIES)

  let languageIndex = 0
  while (languageIndex < languages.length) {
    const languageDictionaries = languages[languageIndex].dictionaries

    let dictionaryIndex = 0
    while (dictionaryIndex < languageDictionaries.length) {
      const dictionary = languageDictionaries[dictionaryIndex]
      if (pageUrl.includes(dictionary.url)) {
        return {
          languageCode: languages[languageIndex].value,
          dictionary: dictionary,
        }
      }

      dictionaryIndex++
    }
    languageIndex++
  }

  return null
}
