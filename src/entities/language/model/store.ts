import { atom, onMount, task } from 'nanostores'

import { ILanguage, TLanguageCode } from '@entities/language'
import { Storage } from '@entities/storage'

import { browser } from '@shared/browser'
import { addToast, getErrorToast } from '@shared/ui/Toast'

import { LANGUAGES } from './languages'

type Languages = ILanguage[]

export const LanguagesStorage = new Storage<Languages>('languages', LANGUAGES)

export const $languages = atom<Languages>(LANGUAGES)

onMount($languages, () => {
  task(async () => {
    const getResult = await LanguagesStorage.get()
    if (getResult.data) {
      $languages.set(getResult.data)
    } else {
      addToast(getErrorToast(getResult.error))
    }
  })
})

export const select = async (languageCodes: TLanguageCode[]) => {
  const filteredLanguages = LANGUAGES.filter((language) =>
    languageCodes.includes(language.value),
  )

  const setResult = await LanguagesStorage.set(filteredLanguages)
  if (setResult.data) {
    $languages.set(filteredLanguages)
    addToast({
      type: 'success',
      title: browser.i18n.getMessage('SELECTED_LANGUAGES_SAVED'),
    })
  } else {
    addToast(getErrorToast(setResult.error))
  }
}
