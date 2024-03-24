import { atom } from 'nanostores'

import { TLanguageCode, languageStore } from '@entities/language'

let defaultValue: TLanguageCode[] = []

export const localStore = {
  languageCodes: atom<TLanguageCode[]>([]),
  islanguageCodesDirty: atom(true),
}

languageStore.$languages.listen((newValue) => {
  if (localStore.islanguageCodesDirty.get()) {
    const languageCodes = newValue.map((language) => language.value)
    defaultValue = languageCodes
    localStore.languageCodes.set(languageCodes)
  }
})

export const toggle = async (languageCode: TLanguageCode) => {
  localStore.islanguageCodesDirty.set(true)

  const languageCodes = localStore.languageCodes.get()
  const isSelected = languageCodes.includes(languageCode)

  const newSelectedLanguages = isSelected
    ? languageCodes.filter((lang) => lang !== languageCode)
    : [...languageCodes, languageCode]

  localStore.languageCodes.set(newSelectedLanguages)
}

export const checkIsSelected = (languageCode: TLanguageCode): boolean => {
  return localStore.languageCodes.get().includes(languageCode)
}

export const reset = () => {
  localStore.languageCodes.set(defaultValue)
}

export const commit = () => {
  languageStore.select(localStore.languageCodes.get())
}
