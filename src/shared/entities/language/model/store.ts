import { atom, computed, onMount, task } from 'nanostores'

import { browser } from '@popup/shared/browser'

import { addError } from '@shared/entities/error'
import { ILanguage, TLanguageCode } from '@shared/entities/language'
import { getStorage } from '@shared/entities/storage'

import { Result, TResult } from '@shared/shared/libs/operationResult'

import { LANGUAGES } from './languages'

type StorageValue = ILanguage[]

export const LanguageStorage = getStorage<StorageValue>(
  'languages',
  LANGUAGES,
  addError,
)

export const $languages = atom<StorageValue>(LANGUAGES)
export const $languageCodes = computed($languages, (languages) => {
  return languages.map((language) => language.value)
})

onMount($languages, () => {
  task(async () => {
    const getResult = await LanguageStorage.get()
    getResult.data && $languages.set(getResult.data)
  })

  const listener = LanguageStorage.onChanged.addListener((changes) => {
    changes.data && $languages.set(changes.data.newValue)
  })

  return () => {
    LanguageStorage.onChanged.removeListener(listener)
  }
})

export const select = async (
  languageCodes: TLanguageCode[],
): Promise<TResult> => {
  const filteredLanguages = LANGUAGES.filter((language) =>
    languageCodes.includes(language.value),
  )

  const setResult = await LanguageStorage.set(filteredLanguages)

  return setResult.data
    ? Result.Success(browser.i18n.getMessage('SELECTED_LANGUAGES_SAVED'))
    : setResult
}
