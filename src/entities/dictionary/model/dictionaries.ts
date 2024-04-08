import { LANGUAGES, TLanguageCode } from '@entities/language'

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
            selectors: {
              text: '.headword',
              transcription: '.us .pron',
              context: '.eg',
              translation: '.def',
            },
          },
          {
            label: 'British',
            value: 'uk',
            selectors: {
              text: '.headword',
              transcription: '.uk .pron',
              context: '.eg',
              translation: '.def',
            },
          },
        ],
        activeVariant: 'uk',
      },
      {
        id: 'en_MerriamWebster',
        name: 'Merriam-Webster',
        url: 'https://www.merriam-webster.com/dictionary',
        selectors: {
          text: 'hword',
          transcription: '.play-pron-v2',
          context: '.ex-sent',
          translation: '.dtText',
        },
      },
      {
        id: 'en_Collins',
        name: 'Collins',
        url: 'https://www.collinsdictionary.com/dictionary/english',
        variants: [
          {
            label: 'American',
            value: 'us',
            selectors: {
              text: '.h2_entry .orth',
              transcription: '.pron .type-ipa',
              context: '.quote',
              translation: '.def',
            },
          },
          {
            label: 'British',
            value: 'uk',
            selectors: {
              text: '.headword',
              transcription: '.uk .pron',
              context: '.eg',
              translation: '.def',
            },
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
            selectors: {
              text: '.headerWord',
              transcription: '.pronRH',
              context: '.quote',
              translation: '.definition',
            },
          },
          {
            label: 'British',
            value: 'uk',
            selectors: {
              text: '.headerWord',
              transcription: '.pronWR',
              context: '.eg',
              translation: '.definition',
            },
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
        selectors: {
          text: '.furigana .kanji',
          transcription: '.meaning-meaning',
          context: 'sentence .japanese',
          translation: '.meaning-meaning',
        },
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
        selectors: {
          text: '.furigana .kanji',
          transcription: '.meaning-meaning',
          context: 'sentence .japanese',
          translation: '.meaning-meaning',
        },
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
        selectors: {
          text: '.furigana .kanji',
          transcription: '.meaning-meaning',
          context: 'sentence .japanese',
          translation: '.meaning-meaning',
        },
      },
    ],
  },
  other: {
    label: 'Other',
    value: 'other',
    dictionaries: [],
  },
}

export const GOOGLE_TRANSLATE = {
  id: 'GoogleTranslate',
  url: 'https://translate.google.com/',
  getLanguage: (): TLanguageCode => {
    const firstLanguage = document.querySelector('.ooArgc.Uw5XA')
    const secondLanguage = document.querySelector('.ooArgc.o9YeG')

    for (
      let languageIndex = 0;
      languageIndex < LANGUAGES.length;
      languageIndex++
    ) {
      if (firstLanguage?.innerHTML === LANGUAGES[languageIndex].label) {
        return LANGUAGES[languageIndex].value
      } else {
        secondLanguage?.innerHTML === LANGUAGES[languageIndex].label
        return LANGUAGES[languageIndex].value
      }
    }

    return 'other'
  },
  selectors: {
    text: 'textarea.er8xn',
    translation: '.ryNqvb',
    context: '',
    transcription: '',
  },
}
