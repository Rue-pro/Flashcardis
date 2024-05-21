import { waitFor } from '@tests/testUtils'
import { allTasks, cleanStores, keepMount } from 'nanostores'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { storage } from '@shared/shared/browser/storage'
import { storageMockClearListeners } from '@shared/shared/browser/storage/__mocks__'
import { Result } from '@shared/shared/libs/operationResult'

import { DICTIONARIES } from '../dictionaries'
import { $dictionaries, DictionaryStorage, selectVariant } from '../store'
import { TDictionaries } from '../types'

describe('dictionary store', () => {
  const error = {
    type: `ERROR`,
    error: null,
  }

  afterEach(async () => {
    await storage.clear()
    cleanStores($dictionaries)
    $dictionaries.set(DICTIONARIES)
    storageMockClearListeners()
    vi.clearAllMocks()
  })

  describe('commmon', () => {
    test('should set value from DictionaryStorage', async () => {
      const newDictionaries: TDictionaries = {
        ...DICTIONARIES,
        en: { ...DICTIONARIES['en'], label: 'Enlgish New Name' },
      }
      await DictionaryStorage.set(newDictionaries)

      keepMount($dictionaries)
      await allTasks()

      expect($dictionaries.get()).toEqual(newDictionaries)
    })

    test('should set empty array and set error when can not get data from DictionaryStorage', async () => {
      vi.spyOn(DictionaryStorage, 'get').mockResolvedValueOnce(
        Result.Error(error),
      )

      keepMount($dictionaries)
      await allTasks()

      expect($dictionaries.get()).toEqual(DICTIONARIES)
    })
  })

  describe('selectVariant', () => {
    const dictionaryId = 'en_CambridgeDictionary'

    test('should set selected variants to DictionaryStorage and return operation success information', async () => {
      keepMount($dictionaries)
      await allTasks()

      await waitFor(async () => {
        const result = await selectVariant('en', dictionaryId, 'us')

        expect(result.data).toBeDefined()
        expect(result.error).toBeNull()

        const dictionary = $dictionaries
          .get()
          .en.dictionaries.find((dictionary) => dictionary.id === dictionaryId)

        if (dictionary && 'variants' in dictionary) {
          expect(dictionary.activeVariant).toBe('us')
        } else {
          throw Error(
            `Dictionary with id ${dictionaryId} and variants option not found`,
          )
        }
      })
    })

    test('should return error if can not set to DictionaryStorage and keep previous variant', async () => {
      vi.spyOn(DictionaryStorage, 'set').mockResolvedValue(Result.Error(error))

      keepMount($dictionaries)
      await allTasks()

      await waitFor(async () => {
        const result = await selectVariant('en', dictionaryId, 'us')

        expect(result.data).toBeNull()
        expect(result.error).toEqual(error)

        const dictionary = $dictionaries
          .get()
          .en.dictionaries.find((dictionary) => dictionary.id === dictionaryId)

        if (dictionary && 'variants' in dictionary) {
          expect(dictionary?.activeVariant).toEqual('uk')
        } else {
          throw Error(
            `Dictionary with id ${dictionaryId} and variants option not found`,
          )
        }
      })
    })

    test('should return error if dictionary not found', async () => {
      keepMount($dictionaries)
      await allTasks()

      await waitFor(async () => {
        const result = await selectVariant('en', 'NOT_EXISTING_ID', 'us')

        expect(result.data).toBeNull()
        expect(result.error).toBeDefined()
      })
    })
  })
})
