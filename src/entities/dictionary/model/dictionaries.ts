import { TDictionaries } from './types'

export const DICTIONARIES: TDictionaries = {
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
    ],
  },
  ja: {
    label: 'Japanese',
    value: 'ja',
    dictionaries: [
      {
        id: 'ja_Jisho',
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
