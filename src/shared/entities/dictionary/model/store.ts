import { atom, onMount, task } from 'nanostores'

import { TLanguageCode } from '@shared/entities/language'
import { getStorage } from '@shared/entities/storage'

import { browser } from '@shared/shared/browser'
import { Result, TResult } from '@shared/shared/libs/operationResult'

import { DICTIONARIES } from './dictionaries'
import { TDictionaries } from './types'

type StorageValue = TDictionaries

export const DictionaryStorage = getStorage<StorageValue>(
  'dictionaries',
  DICTIONARIES,
)

export const $dictionaries = atom<StorageValue>(DICTIONARIES)

onMount($dictionaries, () => {
  task(async () => {
    const getResult = await DictionaryStorage.get()
    getResult.data && $dictionaries.set(getResult.data)
  })

  const listener = DictionaryStorage.onChanged.addListener((changes) => {
    changes.data && $dictionaries.set(changes.data.newValue)
  })

  return () => {
    DictionaryStorage.onChanged.removeListener(listener)
  }
})

export const selectVariant = async (
  languageCode: TLanguageCode,
  dictionaryId: string,
  variant: string,
): Promise<TResult> => {
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

    return setResult.data
      ? Result.Success(
          browser.i18n.getMessage('SELECT_DICTIONARY_VARIANT_SAVED'),
        )
      : setResult
  }

  return Result.Error({
    type: 'ERROR_CAN_NOT_FIND_DICTIONARY_TO_SELECT_VARIANT',
    error: new Error(
      `Dictionary with id ${dictionaryId} and variants option not found, available dictionaries: /n ${JSON.stringify(dictionaries)}`,
    ),
  })
}
