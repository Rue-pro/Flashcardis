import { atom, onMount, task } from 'nanostores'

import { TLanguageCode } from '@entities/language'
import { Storage } from '@entities/storage'

import { browser } from '@shared/browser'
import { Result } from '@shared/libs/operationResult'
import { addToast, getErrorToast } from '@shared/ui/Toast'

import { DICTIONARIES } from './dictionaries'
import { TDictionaries } from './types'

export const DictionaryStorage = new Storage<TDictionaries>(
  'dictionaries',
  DICTIONARIES,
)

export const $dictionaries = atom<TDictionaries>(DICTIONARIES)

onMount($dictionaries, () => {
  task(async () => {
    const getResult = await DictionaryStorage.get()
    if (getResult.data) {
      $dictionaries.set(getResult.data)
    } else {
      addToast(getErrorToast(getResult.error))
    }
  })
})

export const selectVariant = async (
  languageCode: TLanguageCode,
  dictionaryId: string,
  variant: string,
) => {
  const dictionaries = $dictionaries.get()

  const dictionary = dictionaries[languageCode].dictionaries.find(
    (dictionary) => dictionary.id === dictionaryId,
  )

  if (dictionary && 'variants' in dictionary) {
    const newDictionaries = {
      ...dictionaries,
      [languageCode]: {
        ...dictionaries[languageCode],
        dictionaries: dictionaries[languageCode].dictionaries.map(
          (dictionary) => {
            if (dictionary.id === dictionaryId && 'variants' in dictionary) {
              return { ...dictionary, activeVariant: variant }
            } else {
              return { ...dictionary }
            }
          },
        ),
      },
    }
    const setResult = await DictionaryStorage.set(newDictionaries)
    if (setResult.data) {
      $dictionaries.set(newDictionaries)
      addToast({
        type: 'success',
        title: browser.i18n.getMessage('SELECT_DICTIONARY_VARIANT_SAVED'),
      })
    } else {
      addToast(getErrorToast(setResult.error))
    }
  } else {
    const resultError = Result.Error({
      type: 'ERROR_CAN_NOT_FIND_DICTIONARY_TO_SELECT_VARIANT',
      error: new Error(
        `Dictionary with id ${dictionaryId} and variants option not found, available dictionaries: /n ${JSON.stringify(dictionaries)}`,
      ),
    })
    if (resultError.error) {
      addToast(getErrorToast(resultError.error))
    }
  }
}
