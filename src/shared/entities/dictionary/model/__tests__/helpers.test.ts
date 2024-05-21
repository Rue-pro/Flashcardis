import { describe, expect, test } from 'vitest'

import { INoteSelectors } from '@shared/entities/note'

import { getDictionaryByPageUrl, getSelectorsFromDictionary } from '../helpers'
import { IDictionaryWithVariants, IDictionaryWithoutVariants } from '../types'

describe('dictionary helpers', () => {
  describe('getDictionaryByPageUrl', () => {
    test('should return null if page url is empty string', () => {
      expect(getDictionaryByPageUrl('')).toBeNull()
    })

    test("should return null if dictionaries don't have page url", () => {
      expect(
        getDictionaryByPageUrl('https://not.existing.dictionary/'),
      ).toBeNull()
    })

    test('should return dictionary and language for existing page url', () => {
      const dictionary = getDictionaryByPageUrl(
        'https://www.merriam-webster.com/dictionary/shrug',
      )
      expect(dictionary?.languageCode).toBe('en')
      expect(dictionary?.dictionary.id).toBe('en_MerriamWebster')
    })
  })

  describe('getSelectorsFromDictionary', () => {
    const selectors: INoteSelectors = {
      text: 'text',
      translation: 'translation',
      context: 'context',
      transcription: 'transcription',
    }

    test('should return dictionary selectors for dictionary with variants', () => {
      const dictionary: IDictionaryWithVariants = {
        id: 'dictionaryId',
        name: 'dictionaryName',
        url: 'dictionaryUrl',
        variants: [
          {
            label: 'British',
            value: 'br',
            selectors: selectors,
          },
          {
            label: 'American',
            value: 'us',
            selectors: {
              text: '',
              translation: '',
              context: '',
              transcription: '',
            },
          },
        ],
        activeVariant: 'br',
      }

      expect(getSelectorsFromDictionary(dictionary)).toEqual(selectors)
    })

    test('should return dictionary selectors for dictionary with not variants', () => {
      const dictionary: IDictionaryWithoutVariants = {
        id: 'dictionaryId',
        name: 'dictionaryName',
        url: 'dictionaryUrl',
        selectors: selectors,
      }

      expect(getSelectorsFromDictionary(dictionary)).toEqual(selectors)
    })
  })
})
