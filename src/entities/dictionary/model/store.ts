import { atom, onMount, task } from 'nanostores'

import { ILanguage, TLanguageCode } from '@entities/language'
import { Storage } from '@entities/storage'

import { addToast, getErrorToast } from '@shared/ui/Toast'

import { IDictionary } from './types'

type Dictionaries = Record<
  TLanguageCode,
  ILanguage & {
    dictionaries: Array<IDictionary>
  }
>
const defaultDictionaries: Dictionaries = {
  en: {
    label: 'English',
    value: 'en',
    dictionaries: [
      {
        id: 'en_CambridgeDictionary',
        name: 'Cambridge Dictionary',
        url: 'https://dictionary.cambridge.org/',
        variants: [
          {
            label: 'American',
            value: 'us',
          },
          {
            label: 'British',
            value: 'uk',
          },
        ],
        activeVariant: 'uk',
      },
      {
        id: 'en_MerriamWebster',
        name: 'Merriam-Webster',
        url: 'https://www.merriam-webster.com/dictionary',
      },
      {
        id: 'en_Collins',
        name: 'Collins',
        url: 'https://www.collinsdictionary.com/dictionary/english',
        variants: [
          {
            label: 'American',
            value: 'us',
          },
          {
            label: 'British',
            value: 'uk',
          },
        ],
        activeVariant: 'uk',
      },
      {
        id: 'en_Wordreference',
        name: 'Wordreference',
        url: 'https://www.wordreference.com/definition',
        variants: [
          {
            label: 'American',
            value: 'us',
          },
          {
            label: 'British',
            value: 'uk',
          },
        ],
        activeVariant: 'uk',
      },
      {
        id: 'en_GoogleTranslate',
        name: 'Google Translate',
        url: 'https://translate.google.com/',
      },
    ],
  },
  jp: {
    label: 'Japanese',
    value: 'jp',
    dictionaries: [
      {
        id: 'jp_Jisho',
        name: 'Jisho',
        url: 'https://jisho.org/',
      },
    ],
  },
  pt: {
    label: 'Portuguese',
    value: 'pt',
    dictionaries: [
      {
        id: 'jp_Jisho',
        name: 'Jisho',
        url: 'https://jisho.org/',
      },
    ],
  },
  ko: {
    label: 'Korean',
    value: 'ko',
    dictionaries: [
      {
        id: 'jp_Jisho',
        name: 'Jisho',
        url: 'https://jisho.org/',
      },
    ],
  },
}

export const DictionaryStorage = new Storage<Dictionaries>(
  'dictionaries',
  defaultDictionaries,
)

export const $dictionaries = atom<Dictionaries>(defaultDictionaries)

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
    dictionary.activeVariant = variant
  }

  const setResult = await DictionaryStorage.set(dictionaries)
  if (setResult.data) {
    $dictionaries.set({ ...dictionaries })
  } else {
    addToast(getErrorToast(setResult.error))
  }
}
