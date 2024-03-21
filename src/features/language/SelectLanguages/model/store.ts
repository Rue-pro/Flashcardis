import { atom, onMount, task } from 'nanostores'

import { TLanguageCode } from '@entities/language'
import { Storage } from '@entities/storage'

import { browser } from '@shared/browser'
import { addToast, getErrorToast } from '@shared/ui/Toast'

export const SelectedLanguagesStorage = new Storage<TLanguageCode[]>(
  'selected_languages',
  [],
)

let defaultValue: TLanguageCode[] = []
export const $selectedLanguages = atom<TLanguageCode[]>([])

onMount($selectedLanguages, () => {
  task(async () => {
    const getResult = await SelectedLanguagesStorage.get()
    if (getResult.data) {
      defaultValue = getResult.data
      $selectedLanguages.set(getResult.data)
    } else {
      addToast(getErrorToast(getResult.error))
    }
  })
})

export const toggle = async (languageCode: TLanguageCode) => {
  const isSelected = $selectedLanguages.get().includes(languageCode)

  const newSelectedLanguages = isSelected
    ? $selectedLanguages.get().filter((lang) => lang !== languageCode)
    : [...$selectedLanguages.get(), languageCode]

  $selectedLanguages.set(newSelectedLanguages)
}

export const checkIsSelected = (languageCode: TLanguageCode) => {
  return $selectedLanguages.get().includes(languageCode)
}

export const reset = () => {
  $selectedLanguages.set(defaultValue)
}

export const commit = async () => {
  const setResult = await SelectedLanguagesStorage.set($selectedLanguages.get())

  setResult.data
    ? addToast({
        type: 'success',
        title: browser.i18n.getMessage('SELECTED_LANGUAGES_SAVED'),
      })
    : addToast(getErrorToast(setResult.error))
}
