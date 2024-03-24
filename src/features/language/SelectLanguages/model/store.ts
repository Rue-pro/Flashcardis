import { atom } from 'nanostores'

import { TLanguageCode, languageStore } from '@entities/language'

let defaultValue: TLanguageCode[] = []
export const $languageCodes = atom<TLanguageCode[]>([])
export const $islanguageCodesDirty = atom(true)

languageStore.$languages.listen((newValue) => {
  if ($islanguageCodesDirty.get()) {
    const languageCodes = newValue.map((language) => language.value)
    defaultValue = languageCodes
    $languageCodes.set(languageCodes)
  }
})

export const toggle = async (languageCode: TLanguageCode) => {
  $islanguageCodesDirty.set(true)
  const isSelected = $languageCodes.get().includes(languageCode)

  const newSelectedLanguages = isSelected
    ? $languageCodes.get().filter((lang) => lang !== languageCode)
    : [...$languageCodes.get(), languageCode]

  $languageCodes.set(newSelectedLanguages)
}

export const checkIsSelected = (languageCode: TLanguageCode): boolean => {
  return $languageCodes.get().includes(languageCode)
}

export const reset = () => {
  $languageCodes.set(defaultValue)
}

export const commit = () => {
  languageStore.select($languageCodes.get())
}
