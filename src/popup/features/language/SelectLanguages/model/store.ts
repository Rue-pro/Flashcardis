import { atom } from 'nanostores'

import {
  LANGUAGES,
  TLanguageCode,
  languageStore,
} from '@shared/entities/language'

import { TResult } from '@shared/shared/libs/operationResult'

export const localStore = {
  defaultValue: atom<TLanguageCode[]>([]),
  languageCodes: atom<TLanguageCode[]>(
    LANGUAGES.map((language) => language.value),
  ),
  islanguageCodesDirty: atom(false),
}

languageStore.$languages.listen((newValue) => {
  const islanguageCodesDirty = localStore.islanguageCodesDirty.get()
  const languageCodes = newValue.map((language) => language.value)
  if (islanguageCodesDirty) {
    localStore.defaultValue.set(languageCodes)
  } else {
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
  localStore.languageCodes.set(localStore.defaultValue.get())
}

export const syncLocalStoreWithLanguageStore = (): Promise<TResult> => {
  return languageStore.select(localStore.languageCodes.get())
}
